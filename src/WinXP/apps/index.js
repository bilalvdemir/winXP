import InternetExplorer from './InternetExplorer';
import Minesweeper from './Minesweeper';
import ErrorBox from './ErrorBox';
import MyComputer from './MyComputer';
import Notepad from './Notepad';
import Winamp from './Winamp';
import Paint from './Paint';
import iePaper from 'assets/windowsIcons/ie-paper.png';
import ie from 'assets/windowsIcons/ie.png';
import mine from 'assets/minesweeper/mine-icon.png';
import error from 'assets/windowsIcons/897(16x16).png';
import computer from 'assets/windowsIcons/676(16x16).png';
import computerLarge from 'assets/windowsIcons/676(32x32).png';
import notepad from 'assets/windowsIcons/327(16x16).png';
import notepadLarge from 'assets/windowsIcons/327(32x32).png';
import winamp from 'assets/windowsIcons/winamp.png';
import paintLarge from 'assets/windowsIcons/680(32x32).png';
import paint from 'assets/windowsIcons/680(16x16).png';

// Import skin files
import buleMatrix from 'assets/skins/Blue_Metrix.wsz';
import green from 'assets/skins/Green-Dimension-V2.wsz';
import internetArchive from 'assets/skins/Internet-Archive.wsz';
import osx from 'assets/skins/MacOSXAqua1-5.wsz';
import musicForever from 'assets/skins/music-forever.wsz';
import neox from 'assets/skins/NeoX.wsz';
import sonic from 'assets/skins/Sonic_Attitude.wsz';
import topaz from 'assets/skins/TopazAmp1-2.wsz';
import visor from 'assets/skins/Vizor1-01.wsz';
import classic from 'assets/skins/Winamp5_Classified_v5.5.wsz';
import xmms from 'assets/skins/XMMS-Turquoise.wsz';
import zaxon from 'assets/skins/ZaxonRemake1-0.wsz';
import base from 'assets/skins/base-2.91.wsz';
import sonyCdx from 'assets/skins/Sony CDX-MP3.wsz';

const gen = () => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};
const genId = gen();
const genIndex = gen();
export const defaultAppState = [
  {
    component: InternetExplorer,
    header: {
      title: 'Internet Explorer',
      icon: iePaper,
    },
    defaultSize: {
      width: 700,
      height: 500,
    },
    defaultOffset: {
      x: 130,
      y: 20,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    id: genId(),
    zIndex: genIndex(),
  },
  {
    component: Minesweeper,
    header: {
      title: 'Minesweeper',
      icon: mine,
    },
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 180,
      y: 170,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    id: genId(),
    zIndex: genIndex(),
  },
  {
    component: Winamp,
    header: {
      title: 'Winamp',
      icon: winamp,
      invisible: true,
    },
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 0,
      y: 0,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    id: genId(),
    zIndex: genIndex(),
  },
  {
    component: MyComputer,
    header: {
      title: 'My Computer',
      icon: computer,
    },
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 250,
      y: 40,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    id: genId(),
    zIndex: genIndex(),
  },
];

export const availableSkins = [
  { url: base, name: 'Default' },
  { url: classic, name: 'Winamp Classic' },
  { url: buleMatrix, name: 'Blue Matrix' },
  { url: green, name: 'Green Dimension V2' },
  { url: internetArchive, name: 'Internet Archive' },
  { url: osx, name: 'Mac OSX v1.5 (Aqua)' },
  { url: musicForever, name: 'Music Forever' },
  { url: neox, name: 'NeoX' },
  { url: sonic, name: 'Sonic Attitude' },
  { url: topaz, name: 'TopazAmp' },
  { url: visor, name: 'Vizor' },
  { url: xmms, name: 'XMMS Turquoise ' },
  { url: sonyCdx, name: 'Sony CDX' },
  { url: zaxon, name: 'Zaxon Remake' },
];

export const defaultIconState = [
  {
    id: 0,
    icon: computerLarge,
    title: 'Bilgisayarım',
    component: MyComputer,
    isFocus: false,
  },
  {
    id: 1,
    icon: ie,
    title: 'Internet Explorer',
    component: InternetExplorer,
    isFocus: false,
  },
  {
    id: 2,
    icon: mine,
    title: 'Mayın Tarlası',
    component: Minesweeper,
    isFocus: false,
  },
  {
    id: 3,
    icon: notepadLarge,
    title: 'Not Defteri',
    component: Notepad,
    isFocus: false,
  },
  {
    id: 4,
    icon: winamp,
    title: 'Winamp',
    component: Winamp,
    isFocus: false,
  },
  {
    id: 5,
    icon: paintLarge,
    title: 'Paint',
    component: Paint,
    isFocus: false,
  },
  {
    id: 6,
    icon: winamp,
    title: 'Default',
    component: Winamp,
    isFocus: false,
    injectProps: { skin: base },
  },
  {
    id: 7,
    icon: winamp,
    title: 'Winamp Classic',
    component: Winamp,
    isFocus: false,
    injectProps: { skin: classic },
  },
  {
    id: 8,
    icon: winamp,
    title: 'Blue Matrix',
    component: Winamp,
    isFocus: false,
    injectProps: { skin: buleMatrix },
  },
  {
    id: 9,
    icon: winamp,
    title: 'Green Dimension',
    component: Winamp,
    isFocus: false,
    injectProps: { skin: green },
  },
  {
    id: 10,
    icon: winamp,
    title: 'Internet Archive',
    component: Winamp,
    isFocus: false,
    injectProps: { skin: internetArchive },
  },
  {
    id: 11,
    icon: winamp,
    title: 'Mac OSX v1.5',
    component: Winamp,
    isFocus: false,
    injectProps: { skin: osx },
  },
  {
    id: 12,
    icon: winamp,
    title: 'Music Forever',
    component: Winamp,
    isFocus: false,
    injectProps: { skin: musicForever },
  },
  {
    id: 13,
    icon: winamp,
    title: 'NeoX',
    component: Winamp,
    isFocus: false,
    injectProps: { skin: neox },
  },
  {
    id: 14,
    icon: winamp,
    title: 'Sonic Attitude',
    component: Winamp,
    isFocus: false,
    injectProps: { skin: sonic },
  },
  {
    id: 15,
    icon: winamp,
    title: 'TopazAmp',
    component: Winamp,
    isFocus: false,
    injectProps: { skin: topaz },
  },
  {
    id: 16,
    icon: winamp,
    title: 'Vizor',
    component: Winamp,
    isFocus: false,
    injectProps: { skin: visor },
  },
  {
    id: 17,
    icon: winamp,
    title: 'XMMS Turquoise',
    component: Winamp,
    isFocus: false,
    injectProps: { skin: xmms },
  },
  {
    id: 18,
    icon: winamp,
    title: 'Sony CDX',
    component: Winamp,
    isFocus: false,
    injectProps: { skin: sonyCdx },
  },
  {
    id: 19,
    icon: winamp,
    title: 'Zaxon Remake',
    component: Winamp,
    isFocus: false,
    injectProps: { skin: zaxon },
  },
];

export const appSettings = {
  'Internet Explorer': {
    header: {
      icon: iePaper,
      title: 'InternetExplorer',
    },
    component: InternetExplorer,
    defaultSize: {
      width: 700,
      height: 500,
    },
    defaultOffset: {
      x: 140,
      y: 30,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
  Minesweeper: {
    header: {
      icon: mine,
      title: 'Minesweeper',
    },
    component: Minesweeper,
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 190,
      y: 180,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  Error: {
    header: {
      icon: error,
      title: 'C:\\',
      buttons: ['close'],
      noFooterWindow: true,
    },
    component: ErrorBox,
    defaultSize: {
      width: 380,
      height: 0,
    },
    defaultOffset: {
      x: window.innerWidth / 2 - 190,
      y: window.innerHeight / 2 - 60,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  'My Computer': {
    header: {
      icon: computer,
      title: 'My Computer',
    },
    component: MyComputer,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 260,
      y: 50,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: false,
  },
  Notepad: {
    header: {
      icon: notepad,
      title: 'Untitled - Notepad',
    },
    component: Notepad,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 270,
      y: 60,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
  Winamp: {
    header: {
      icon: winamp,
      title: 'Winamp',
      invisible: true,
    },
    component: Winamp,
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 0,
      y: 0,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: false,
  },
  Paint: {
    header: {
      icon: paint,
      title: 'Untitled - Paint',
    },
    component: Paint,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 280,
      y: 70,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
};

export { InternetExplorer, Minesweeper, ErrorBox, MyComputer, Notepad, Winamp };
