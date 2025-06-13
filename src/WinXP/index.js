import React, { useReducer, useRef, useCallback, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import useMouse from 'react-use/lib/useMouse';

import {
  ADD_APP,
  DEL_APP,
  FOCUS_APP,
  MINIMIZE_APP,
  TOGGLE_MAXIMIZE_APP,
  FOCUS_ICON,
  SELECT_ICONS,
  FOCUS_DESKTOP,
  START_SELECT,
  END_SELECT,
  POWER_OFF,
  CANCEL_POWER_OFF,
  STARTUP_COMPLETE,
  USER_LOGIN,
  USER_LOGOUT,
  WELCOME,
} from './constants/actions';
import { FOCUSING, POWER_STATE } from './constants';
import { defaultIconState, defaultAppState, appSettings } from './apps';
import Modal from './Modal';
import Footer from './Footer';
import Windows from './Windows';
import Icons from './Icons';
import { DashedBox } from 'components';
import StartupScreen from './apps/Startup/StartupScreen';
import LoginScreen from './apps/Startup/LoginScreen';
import WelcomeScreen from './apps/Startup/WelcomeScreen';

const BOOT_STATE = {
  STARTUP: 'startup',
  LOGIN: 'login',
  DESKTOP: 'desktop',
  WELCOME: 'welcome',
};

// LocalStorage yardımcı fonksiyonları
const LOGIN_STORAGE_KEY = 'winxp_login_session';
const LOGIN_DURATION = 60 * 60 * 1000; // 1 saat (milisaniye)

const saveLoginSession = user => {
  const loginData = {
    user,
    timestamp: Date.now(),
    expiresAt: Date.now() + LOGIN_DURATION,
  };
  localStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify(loginData));
};

const getValidLoginSession = () => {
  try {
    const storedData = localStorage.getItem(LOGIN_STORAGE_KEY);
    if (!storedData) return null;

    const loginData = JSON.parse(storedData);
    const now = Date.now();

    // 1 saat geçmiş mi kontrol et
    if (now > loginData.expiresAt) {
      localStorage.removeItem(LOGIN_STORAGE_KEY);
      return null;
    }

    return loginData.user;
  } catch (error) {
    console.error('Login session okuma hatası:', error);
    localStorage.removeItem(LOGIN_STORAGE_KEY);
    return null;
  }
};

const clearLoginSession = () => {
  localStorage.removeItem(LOGIN_STORAGE_KEY);
};

// Initial state'i localStorage'dan kontrol ederek belirle
const getInitialState = () => {
  const validUser = getValidLoginSession();

  if (validUser) {
    // Geçerli login varsa direkt desktop'a git
    return {
      bootState: BOOT_STATE.DESKTOP,
      currentUser: validUser,
      startupProgress: 0,
      apps: defaultAppState,
      nextAppID: defaultAppState.length,
      nextZIndex: defaultAppState.length,
      focusing: FOCUSING.WINDOW,
      icons: defaultIconState,
      selecting: false,
      powerState: POWER_STATE.START,
    };
  } else {
    // Geçerli login yoksa normal startup
    return {
      bootState: BOOT_STATE.STARTUP,
      currentUser: null,
      startupProgress: 0,
      apps: defaultAppState,
      nextAppID: defaultAppState.length,
      nextZIndex: defaultAppState.length,
      focusing: FOCUSING.WINDOW,
      icons: defaultIconState,
      selecting: false,
      powerState: POWER_STATE.START,
    };
  }
};

const reducer = (state, action = { type: '' }) => {
  switch (action.type) {
    case STARTUP_COMPLETE:
      return { ...state, bootState: BOOT_STATE.LOGIN };
    case USER_LOGIN:
      // Login bilgisini localStorage'a kaydet
      saveLoginSession(action.payload);
      return {
        ...state,
        bootState: BOOT_STATE.WELCOME,
        currentUser: action.payload,
      };
    case WELCOME:
      return {
        ...state,
        bootState: BOOT_STATE.DESKTOP,
        currentUser: action.payload,
      };
    case USER_LOGOUT:
      // Logout olurken session'ı temizle
      clearLoginSession();
      return {
        ...state,
        bootState: BOOT_STATE.LOGIN,
        currentUser: null,
        apps: [],
      };
    case ADD_APP:
      const app = state.apps.find(
        _app => _app.component === action.payload.component,
      );
      if (action.payload.multiInstance || !app) {
        return {
          ...state,
          apps: [
            ...state.apps,
            {
              ...action.payload,
              id: state.nextAppID,
              zIndex: state.nextZIndex,
            },
          ],
          nextAppID: state.nextAppID + 1,
          nextZIndex: state.nextZIndex + 1,
          focusing: FOCUSING.WINDOW,
        };
      }
      const apps = state.apps.map(app =>
        app.component === action.payload.component
          ? { ...app, zIndex: state.nextZIndex, minimized: false }
          : app,
      );
      return {
        ...state,
        apps,
        nextZIndex: state.nextZIndex + 1,
        focusing: FOCUSING.WINDOW,
      };
    case DEL_APP:
      if (state.focusing !== FOCUSING.WINDOW) return state;
      return {
        ...state,
        apps: state.apps.filter(app => app.id !== action.payload),
        focusing:
          state.apps.length > 1
            ? FOCUSING.WINDOW
            : state.icons.find(icon => icon.isFocus)
            ? FOCUSING.ICON
            : FOCUSING.DESKTOP,
      };
    case FOCUS_APP: {
      const apps = state.apps.map(app =>
        app.id === action.payload
          ? { ...app, zIndex: state.nextZIndex, minimized: false }
          : app,
      );
      return {
        ...state,
        apps,
        nextZIndex: state.nextZIndex + 1,
        focusing: FOCUSING.WINDOW,
      };
    }
    case MINIMIZE_APP: {
      if (state.focusing !== FOCUSING.WINDOW) return state;
      const apps = state.apps.map(app =>
        app.id === action.payload ? { ...app, minimized: true } : app,
      );
      return {
        ...state,
        apps,
        focusing: FOCUSING.WINDOW,
      };
    }
    case TOGGLE_MAXIMIZE_APP: {
      if (state.focusing !== FOCUSING.WINDOW) return state;
      const apps = state.apps.map(app =>
        app.id === action.payload ? { ...app, maximized: !app.maximized } : app,
      );
      return {
        ...state,
        apps,
        focusing: FOCUSING.WINDOW,
      };
    }
    case FOCUS_ICON: {
      const icons = state.icons.map(icon => ({
        ...icon,
        isFocus: icon.id === action.payload,
      }));
      return {
        ...state,
        focusing: FOCUSING.ICON,
        icons,
      };
    }
    case SELECT_ICONS: {
      const icons = state.icons.map(icon => ({
        ...icon,
        isFocus: action.payload.includes(icon.id),
      }));
      return {
        ...state,
        icons,
        focusing: FOCUSING.ICON,
      };
    }
    case FOCUS_DESKTOP:
      return {
        ...state,
        focusing: FOCUSING.DESKTOP,
        icons: state.icons.map(icon => ({
          ...icon,
          isFocus: false,
        })),
      };
    case START_SELECT:
      return {
        ...state,
        focusing: FOCUSING.DESKTOP,
        icons: state.icons.map(icon => ({
          ...icon,
          isFocus: false,
        })),
        selecting: action.payload,
      };
    case END_SELECT:
      return {
        ...state,
        selecting: null,
      };
    case POWER_OFF:
      return {
        ...state,
        powerState: action.payload,
      };
    case CANCEL_POWER_OFF:
      return {
        ...state,
        powerState: POWER_STATE.START,
      };
    default:
      return state;
  }
};

function WinXP() {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const ref = useRef(null);
  const mouse = useMouse(ref);
  const focusedAppId = getFocusedAppId();

  // Session süresini kontrol et
  useEffect(() => {
    if (state.currentUser && state.bootState === BOOT_STATE.DESKTOP) {
      const checkSession = () => {
        const validUser = getValidLoginSession();
        if (!validUser) {
          // Session süresi dolmuş, logout yap
          dispatch({ type: USER_LOGOUT });
        }
      };

      // Her 5 dakikada bir kontrol et
      const interval = setInterval(checkSession, 5 * 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [state.currentUser, state.bootState]);

  const onFocusApp = useCallback(id => {
    dispatch({ type: FOCUS_APP, payload: id });
  }, []);

  const onMaximizeWindow = useCallback(
    id => {
      if (focusedAppId === id) {
        dispatch({ type: TOGGLE_MAXIMIZE_APP, payload: id });
      }
    },
    [focusedAppId],
  );

  const onMinimizeWindow = useCallback(
    id => {
      if (focusedAppId === id) {
        dispatch({ type: MINIMIZE_APP, payload: id });
      }
    },
    [focusedAppId],
  );

  const onCloseApp = useCallback(
    id => {
      if (focusedAppId === id) {
        dispatch({ type: DEL_APP, payload: id });
      }
    },
    [focusedAppId],
  );

  function onMouseDownFooterApp(id) {
    if (focusedAppId === id) {
      dispatch({ type: MINIMIZE_APP, payload: id });
    } else {
      dispatch({ type: FOCUS_APP, payload: id });
    }
  }

  function onMouseDownIcon(id) {
    dispatch({ type: FOCUS_ICON, payload: id });
  }

  function onDoubleClickIcon(component, injectProps) {
    const appSetting = Object.values(appSettings).find(
      setting => setting.component === component,
    );
    if (injectProps?.skin) {
      localStorage.setItem('winampSkinUrl', injectProps.skin);
    }
    dispatch({ type: ADD_APP, payload: { ...appSetting, injectProps } });
  }

  function getFocusedAppId() {
    if (state.focusing !== FOCUSING.WINDOW) return -1;
    const focusedApp = [...state.apps]
      .sort((a, b) => b.zIndex - a.zIndex)
      .find(app => !app.minimized);
    return focusedApp ? focusedApp.id : -1;
  }

  function onMouseDownFooter() {
    dispatch({ type: FOCUS_DESKTOP });
  }

  function onClickMenuItem(o) {
    if (o === 'Internet')
      dispatch({ type: ADD_APP, payload: appSettings['Internet Explorer'] });
    else if (o === 'Minesweeper')
      dispatch({ type: ADD_APP, payload: appSettings.Minesweeper });
    else if (o === 'My Computer')
      dispatch({ type: ADD_APP, payload: appSettings['My Computer'] });
    else if (o === 'Notepad')
      dispatch({ type: ADD_APP, payload: appSettings.Notepad });
    else if (o === 'Winamp')
      dispatch({ type: ADD_APP, payload: appSettings.Winamp });
    else if (o === 'Paint')
      dispatch({ type: ADD_APP, payload: appSettings.Paint });
    else if (o === 'Log Off')
      dispatch({ type: POWER_OFF, payload: POWER_STATE.LOG_OFF });
    else if (o === 'Turn Off Computer')
      dispatch({ type: POWER_OFF, payload: POWER_STATE.TURN_OFF });
    else
      dispatch({
        type: ADD_APP,
        payload: {
          ...appSettings.Error,
          injectProps: { message: 'C:\\\nApplication not found' },
        },
      });
  }

  function onMouseDownDesktop(e) {
    if (e.target === e.currentTarget)
      dispatch({
        type: START_SELECT,
        payload: { x: mouse.docX, y: mouse.docY },
      });
  }

  function onMouseUpDesktop(e) {
    dispatch({ type: END_SELECT });
  }

  const onIconsSelected = useCallback(
    iconIds => {
      dispatch({ type: SELECT_ICONS, payload: iconIds });
    },
    [dispatch],
  );

  function onClickModalButton(text) {
    dispatch({ type: CANCEL_POWER_OFF });
    dispatch({
      type: ADD_APP,
      payload: appSettings.Error,
    });
  }

  function onModalClose() {
    dispatch({ type: CANCEL_POWER_OFF });
  }

  // Modal işlemleri için callback'ler
  function handleLogOff() {
    dispatch({ type: USER_LOGOUT });
  }

  function handleShutdown() {
    // Session'ı temizle ve startup'a git
    clearLoginSession();
    dispatch({ type: CANCEL_POWER_OFF });
    // State'i sıfırla ve startup'a yönlendir
    window.location.reload();
  }

  function handleRestart() {
    // Session'ı temizle ve startup'a git
    clearLoginSession();
    dispatch({ type: CANCEL_POWER_OFF });
    // State'i sıfırla ve startup'a yönlendir
    window.location.reload();
  }

  return (
    <Container
      ref={ref}
      onMouseUp={onMouseUpDesktop}
      onMouseDown={onMouseDownDesktop}
      state={state.powerState}
    >
      {state.bootState === BOOT_STATE.STARTUP && (
        <StartupScreen
          onComplete={() => dispatch({ type: 'STARTUP_COMPLETE' })}
        />
      )}

      {/* LOGIN SCREEN */}
      {state.bootState === BOOT_STATE.LOGIN && (
        <LoginScreen
          onLogin={user => dispatch({ type: 'USER_LOGIN', payload: user })}
        />
      )}
      {state.bootState === BOOT_STATE.WELCOME && (
        <WelcomeScreen
          onLogin={user => dispatch({ type: 'WELCOME', payload: user })}
        />
      )}
      {state.bootState === BOOT_STATE.DESKTOP && (
        <>
          <Icons
            icons={state.icons}
            onMouseDown={onMouseDownIcon}
            onDoubleClick={onDoubleClickIcon}
            displayFocus={state.focusing === FOCUSING.ICON}
            appSettings={appSettings}
            mouse={mouse}
            selecting={state.selecting}
            setSelectedIcons={onIconsSelected}
          />
          <DashedBox startPos={state.selecting} mouse={mouse} />
          <Windows
            apps={state.apps}
            onMouseDown={onFocusApp}
            onClose={onCloseApp}
            onMinimize={onMinimizeWindow}
            onMaximize={onMaximizeWindow}
            focusedAppId={focusedAppId}
          />
          <Footer
            apps={state.apps}
            onMouseDownApp={onMouseDownFooterApp}
            focusedAppId={focusedAppId}
            onMouseDown={onMouseDownFooter}
            onClickMenuItem={onClickMenuItem}
          />
          {state.powerState !== POWER_STATE.START && (
            <Modal
              onClose={onModalClose}
              onClickButton={onClickModalButton}
              onLogOff={handleLogOff}
              onShutdown={handleShutdown}
              onRestart={handleRestart}
              mode={state.powerState}
            />
          )}
        </>
      )}
    </Container>
  );
}

const powerOffAnimation = keyframes`
    0% {
        filter: brightness(1) grayscale(0);
    }
    30% {
        filter: brightness(1) grayscale(0);
    }
    100% {
        filter: brightness(0.6) grayscale(1);
    }
`;

const animation = {
  [POWER_STATE.START]: '',
  [POWER_STATE.TURN_OFF]: powerOffAnimation,
  [POWER_STATE.LOG_OFF]: powerOffAnimation,
};

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans');
  font-family: Tahoma, 'Noto Sans', sans-serif;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: url(https://i.imgur.com/Zk6TR5k.jpg) no-repeat center center fixed;
  background-size: cover;
  animation: ${({ state }) => animation[state]} 5s forwards;
  *:not(input):not(textarea) {
    user-select: none;
  }
`;

export default WinXP;
