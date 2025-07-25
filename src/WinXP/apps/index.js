import InternetExplorer from './InternetExplorer';
import Minesweeper from './Minesweeper';
import ErrorBox from './ErrorBox';
import MyComputer from './MyComputer';
import Notepad from './Notepad';
import Winamp from './Winamp';
import Paint from './Paint';
import SkiFree from './SkiFree';
import OyunKutusu from './OyunKutusu';
import TetrisEmulator from './TetrisEmulator';
import SnakeEmulator from './SnakeEmulator';
import MarioEmulator from './MarioEmulator';
import PacmanEmulator from './PacmanEmulator';
import ContraEmulator from './ContraEmulator';
import BattleCityEmulator from './BattleCityEmulator';
import StreetBasketballEmulator from './StreetBasketballEmulator';
import AdventureIsland1Emulator from './AdventureIsland1Emulator';
import AdventureIsland2Emulator from './AdventureIsland2Emulator';
import AdventureIsland3Emulator from './AdventureIsland3Emulator';
import AdventureIsland4Emulator from './AdventureIsland4Emulator';
import KunioSoccerEmulator from './KunioSoccerEmulator';
import BombermanEmulator from './BombermanEmulator';
import PinballEmulator from './PinballEmulator';
import HalfLifeEmulator from './HalfLifeEmulator';
import HalfLife1Emulator from './HalfLife1Emulator';
import iePaper from 'assets/windowsIcons/ie-paper.png';
import ie from 'assets/windowsIcons/ie.png';
import mine from 'assets/minesweeper/mine-icon.png';
import skifree from 'assets/skifree/skifree-icon.png';
import oyunkutusu from 'assets/windowsIcons/227(32x32).png';
import tetris from 'assets/images/tetris.jpg';
import snake from 'assets/images/snake-big.png';
import marioemulator from 'assets/images/mario.jpg';
import pacman from 'assets/images/pacman.jpg';
import contra from 'assets/images/contra.png';
import battlecity from 'assets/images/battle-city.jpeg';
import basketball from 'assets/images/nekketsu-street-basket.png';
import adventure1 from 'assets/images/hudsons-adventure-island.png';
import adventure2 from 'assets/images/hudsons-adventure-island-ii.jpg';
import adventure3 from 'assets/images/hudsons-adventure-island-3.jpg';
import adventure4 from 'assets/images/hudsons-adventure-island-4.jpg';
import kuniosoccer from 'assets/images/kunio-kun-no-nekketsu-soccer-league.webp';
import bomberman from 'assets/images/bomberman.png';
import pinball from 'assets/images/3d-pinball.png';
import halflife from 'assets/images/half-life.png';
import halflife1 from 'assets/images/half-life.png'; // Using same Half-Life icon for both games
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
  {
    id: 20,
    icon: skifree,
    title: 'SkiFree',
    component: SkiFree,
    isFocus: false,
  },
  {
    id: 21,
    icon: oyunkutusu,
    title: 'Oyun Kutusu',
    component: OyunKutusu,
    isFocus: false,
  },
  {
    id: 23,
    icon: tetris,
    title: 'Tetris',
    component: TetrisEmulator,
    isFocus: false,
  },
  {
    id: 24,
    icon: snake,
    title: 'Snake',
    component: SnakeEmulator,
    isFocus: false,
  },
  {
    id: 25,
    icon: marioemulator,
    title: 'Mario',
    component: MarioEmulator,
    isFocus: false,
  },
  {
    id: 26,
    icon: pacman,
    title: 'Pac-Man',
    component: PacmanEmulator,
    isFocus: false,
  },
  {
    id: 27,
    icon: contra,
    title: 'Contra Attack',
    component: ContraEmulator,
    isFocus: false,
  },
  {
    id: 28,
    icon: battlecity,
    title: 'Battle City',
    component: BattleCityEmulator,
    isFocus: false,
  },
  {
    id: 29,
    icon: basketball,
    title: 'Street Basketball',
    component: StreetBasketballEmulator,
    isFocus: false,
  },
  {
    id: 30,
    icon: adventure1,
    title: 'Adventure Island',
    component: AdventureIsland1Emulator,
    isFocus: false,
  },
  {
    id: 31,
    icon: adventure2,
    title: 'Adventure Island II',
    component: AdventureIsland2Emulator,
    isFocus: false,
  },
  {
    id: 32,
    icon: adventure3,
    title: 'Adventure Island III',
    component: AdventureIsland3Emulator,
    isFocus: false,
  },
  {
    id: 33,
    icon: adventure4,
    title: 'Adventure Island IV',
    component: AdventureIsland4Emulator,
    isFocus: false,
  },
  {
    id: 34,
    icon: kuniosoccer,
    title: 'Kunio Soccer',
    component: KunioSoccerEmulator,
    isFocus: false,
  },
  {
    id: 35,
    icon: bomberman,
    title: 'Bomberman',
    component: BombermanEmulator,
    isFocus: false,
  },
  {
    id: 36,
    icon: pinball,
    title: '3D Pinball',
    component: PinballEmulator,
    isFocus: false,
  },
  {
    id: 37,
    icon: halflife,
    title: 'Half-Life',
    component: HalfLifeEmulator,
    isFocus: false,
  },
  {
    id: 38,
    icon: halflife1,
    title: 'Half-Life 1',
    component: HalfLife1Emulator,
    isFocus: false,
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
  SkiFree: {
    header: {
      icon: skifree,
      title: 'SkiFree',
    },
    component: SkiFree,
    defaultSize: {
      width: 800,
      height: 600,
    },
    defaultOffset: {
      x: 200,
      y: 50,
    },
    resizable: true,
    minimized: false,
    maximized: false,
    multiInstance: false,
  },
  'Oyun Kutusu': {
    header: {
      icon: oyunkutusu,
      title: 'Oyun Kutusu',
    },
    component: OyunKutusu,
    defaultSize: {
      width: 800,
      height: 600,
    },
    defaultOffset: {
      x: 220,
      y: 70,
    },
    resizable: true,
    minimized: false,
    maximized: true,
    multiInstance: false,
  },
  Tetris: {
    header: {
      icon: tetris,
      title: 'Tetris (NES)',
    },
    component: TetrisEmulator,
    defaultSize: {
      width: 900,
      height: 700,
    },
    defaultOffset: {
      x: 260,
      y: 110,
    },
    resizable: true,
    minimized: false,
    maximized: true,
    multiInstance: false,
  },
  Snake: {
    header: {
      icon: snake,
      title: 'Snake Rattle n Roll (NES)',
    },
    component: SnakeEmulator,
    defaultSize: {
      width: 900,
      height: 700,
    },
    defaultOffset: {
      x: 280,
      y: 130,
    },
    resizable: true,
    minimized: false,
    maximized: true,
    multiInstance: false,
  },
  Mario: {
    header: {
      icon: marioemulator,
      title: 'Super Mario Bros (NES)',
    },
    component: MarioEmulator,
    defaultSize: {
      width: 900,
      height: 700,
    },
    defaultOffset: {
      x: 300,
      y: 150,
    },
    resizable: true,
    minimized: false,
    maximized: true,
    multiInstance: false,
  },
  'Pac-Man': {
    header: {
      icon: pacman,
      title: 'Pac-Man (NES)',
    },
    component: PacmanEmulator,
    defaultSize: {
      width: 900,
      height: 700,
    },
    defaultOffset: {
      x: 320,
      y: 170,
    },
    resizable: true,
    minimized: false,
    maximized: true,
    multiInstance: false,
  },
  'Contra Attack': {
    header: {
      icon: contra,
      title: 'Contra (NES)',
    },
    component: ContraEmulator,
    defaultSize: {
      width: 900,
      height: 700,
    },
    defaultOffset: {
      x: 340,
      y: 190,
    },
    resizable: true,
    minimized: false,
    maximized: true,
    multiInstance: false,
  },
  'Battle City': {
    header: {
      icon: battlecity,
      title: 'Battle City (NES)',
    },
    component: BattleCityEmulator,
    defaultSize: {
      width: 900,
      height: 700,
    },
    defaultOffset: {
      x: 360,
      y: 210,
    },
    resizable: true,
    minimized: false,
    maximized: true,
    multiInstance: false,
  },
  'Street Basketball': {
    header: {
      icon: basketball,
      title: 'Street Basketball (NES)',
    },
    component: StreetBasketballEmulator,
    defaultSize: {
      width: 900,
      height: 700,
    },
    defaultOffset: {
      x: 380,
      y: 230,
    },
    resizable: true,
    minimized: false,
    maximized: true,
    multiInstance: false,
  },
  'Adventure Island': {
    header: {
      icon: adventure1,
      title: 'Adventure Island (NES)',
    },
    component: AdventureIsland1Emulator,
    defaultSize: {
      width: 900,
      height: 700,
    },
    defaultOffset: {
      x: 400,
      y: 250,
    },
    resizable: true,
    minimized: false,
    maximized: true,
    multiInstance: false,
  },
  'Adventure Island II': {
    header: {
      icon: adventure2,
      title: 'Adventure Island II (NES)',
    },
    component: AdventureIsland2Emulator,
    defaultSize: {
      width: 900,
      height: 700,
    },
    defaultOffset: {
      x: 420,
      y: 270,
    },
    resizable: true,
    minimized: false,
    maximized: true,
    multiInstance: false,
  },
  'Adventure Island III': {
    header: {
      icon: adventure3,
      title: 'Adventure Island III (NES)',
    },
    component: AdventureIsland3Emulator,
    defaultSize: {
      width: 900,
      height: 700,
    },
    defaultOffset: {
      x: 440,
      y: 290,
    },
    resizable: true,
    minimized: false,
    maximized: true,
    multiInstance: false,
  },
  'Adventure Island IV': {
    header: {
      icon: adventure4,
      title: 'Adventure Island IV (NES)',
    },
    component: AdventureIsland4Emulator,
    defaultSize: {
      width: 900,
      height: 700,
    },
    defaultOffset: {
      x: 460,
      y: 310,
    },
    resizable: true,
    minimized: false,
    maximized: true,
    multiInstance: false,
  },
  'Kunio Soccer': {
    header: {
      icon: kuniosoccer,
      title: 'Kunio-kun Soccer (NES)',
    },
    component: KunioSoccerEmulator,
    defaultSize: {
      width: 900,
      height: 700,
    },
    defaultOffset: {
      x: 480,
      y: 330,
    },
    resizable: true,
    minimized: false,
    maximized: true,
    multiInstance: false,
  },
  Bomberman: {
    header: {
      icon: bomberman,
      title: 'Bomberman (NES)',
    },
    component: BombermanEmulator,
    defaultSize: {
      width: 900,
      height: 700,
    },
    defaultOffset: {
      x: 500,
      y: 350,
    },
    resizable: true,
    minimized: false,
    maximized: true,
    multiInstance: false,
  },
  '3D Pinball': {
    header: {
      icon: pinball,
      title: '3D Pinball Space Cadet (DOS)',
    },
    component: PinballEmulator,
    defaultSize: {
      width: 900,
      height: 700,
    },
    defaultOffset: {
      x: 520,
      y: 370,
    },
    resizable: true,
    minimized: false,
    maximized: true,
    multiInstance: false,
  },
  'Half-Life': {
    header: {
      icon: halflife,
      title: 'Half-Life Deathmatch',
    },
    component: HalfLifeEmulator,
    defaultSize: {
      width: 900,
      height: 700,
    },
    defaultOffset: {
      x: 540,
      y: 390,
    },
    resizable: true,
    minimized: false,
    maximized: true,
    multiInstance: false,
  },
  'Half-Life 1': {
    header: {
      icon: halflife1,
      title: 'Half-Life 1',
    },
    component: HalfLife1Emulator,
    defaultSize: {
      width: 900,
      height: 700,
    },
    defaultOffset: {
      x: 560,
      y: 410,
    },
    resizable: true,
    minimized: false,
    maximized: true,
    multiInstance: false,
  },
};

export {
  InternetExplorer,
  Minesweeper,
  ErrorBox,
  MyComputer,
  Notepad,
  Winamp,
  SkiFree,
  OyunKutusu,
  TetrisEmulator,
  SnakeEmulator,
  MarioEmulator,
  PacmanEmulator,
  ContraEmulator,
  BattleCityEmulator,
  StreetBasketballEmulator,
  AdventureIsland1Emulator,
  AdventureIsland2Emulator,
  AdventureIsland3Emulator,
  AdventureIsland4Emulator,
  KunioSoccerEmulator,
  BombermanEmulator,
  PinballEmulator,
  HalfLifeEmulator,
  HalfLife1Emulator,
};
