import bell_icon from "./bell.png";
import home_icon from "./home.png";
import like_icon from "./like.png";
import loop_icon from "./loop.png";
import mic_icon from "./mic.png";
import next_icon from "./next.png";
import play_icon from "./play.png";
import pause_icon from "./pause.png";
import plays_icon from "./plays.png";
import prev_icon from "./prev.png";
import search_icon from "./search.png";
import shuffle_icon from "./shuffle.png";
import speaker_icon from "./speaker.png";
import stack_icon from "./stack.png";
import zoom_icon from "./zoom.png";
import plus_icon from "./plus.png";
import arrow_icon from "./arrow.png";
import mini_player_icon from "./mini-player.png";
import queue_icon from "./queue.png";
import volume_icon from "./volume.png";
import arrow_right from "./right_arrow.png";
import arrow_left from "./left_arrow.png";
import spotify_logo from "./spotify_logo.png";
import clock_icon from "./clock_icon.png";
import upload_area from "./upload_area.png";
import upload_added from "./upload_added.png";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import img4 from "./img4.jpg";
import img5 from "./img5.jpg";
import img6 from "./img6.jpg";
import img7 from "./img7.jpg";
import img8 from "./img8.jpg";
import img9 from "./img9.jpg";
import img10 from "./img10.jpg";
import img11 from "./img11.jpg";
import img12 from "./img12.jpg";
import img13 from "./img13.jpg";
import img14 from "./img14.jpg";
import img15 from "./img15.jpg";
import img16 from "./img16.jpg";
import timeless from "./timeless.jpeg";
import song1 from "./song1.mp3";
import song2 from "./song2.mp3";
import song3 from "./song3.mp3";
import timelessSong from "./timeless.mp3";
import artist1 from "./theWeeknd.jpeg";

export const assets = {
  bell_icon,
  home_icon,
  like_icon,
  loop_icon,
  mic_icon,
  next_icon,
  play_icon,
  plays_icon,
  prev_icon,
  search_icon,
  shuffle_icon,
  speaker_icon,
  stack_icon,
  zoom_icon,
  plus_icon,
  arrow_icon,
  mini_player_icon,
  volume_icon,
  queue_icon,
  pause_icon,
  arrow_left,
  arrow_right,
  spotify_logo,
  clock_icon,
  upload_area,
  upload_added,
};

export const albumsData = [
  {
    id: 0,
    name: "Top 50 Global",
    image: img8,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#2a4365",
  },
  {
    id: 1,
    name: "Top 50 India",
    image: img9,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#22543d",
  },
  {
    id: 2,
    name: "Trending India",
    image: img10,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#742a2a",
  },
  {
    id: 3,
    name: "Trending Global",
    image: img16,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#44337a",
  },
  {
    id: 4,
    name: "Mega Hits",
    image: img11,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#234e52",
  },
  {
    id: 5,
    name: "Happy Favorites",
    image: img15,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#744210",
  },
];

export const songsData = [
  {
    id: 0,
    name: "Song One",
    image: img1,
    file: song1,
    desc: "Put a smile on your face with these happy tunes",
    duration: "3:00",
  },
  {
    id: 1,
    name: "Song Two",
    image: img2,
    file: song2,
    desc: "Put a smile on your face with these happy tunes",
    duration: "2:20",
  },
  {
    id: 2,
    name: "Song Three",
    image: img3,
    file: song3,
    desc: "Put a smile on your face with these happy tunes",
    duration: "2:32",
  },
  {
    id: 3,
    name: "Song Four",
    image: img4,
    file: song1,
    desc: "Put a smile on your face with these happy tunes",
    duration: "2:50",
  },
  {
    id: 4,
    name: "Song Five",
    image: img5,
    file: song2,
    desc: "Put a smile on your face with these happy tunes",
    duration: "3:10",
  },
  {
    id: 5,
    name: "Song Six",
    image: img14,
    file: song3,
    desc: "Put a smile on your face with these happy tunes",
    duration: "2:45",
  },
  {
    id: 6,
    name: "Song Seven",
    image: img7,
    file: song1,
    desc: "Put a smile on your face with these happy tunes",
    duration: "2:18",
  },
  {
    id: 7,
    name: "Song Eight",
    image: img12,
    file: song2,
    desc: "Put a smile on your face with these happy tunes",
    duration: "2:35",
  },
  {
    id: 8,
    name: "Timeless",
    image: timeless,
    file: timelessSong,
    desc: "You have no time left",
    duration: "2:35",
  },
];

export const artistData = [
  {
    _id: "fdadasd",
    name: "The Weeknd",
    image: artist1,
    songs: [
      {
        id: 8,
        name: "Timeless",
        image: timeless,
        file: timelessSong,
        desc: "You have no time left",
        duration: "2:35",
      },
    ],
  },
  {
    _id: "a1b2c3d4",
    name: "Taylor Swift",
    image: artist1,
    songs: [
      {
        id: 9,
        name: "Eternal",
        image: timeless,
        file: timelessSong,
        desc: "A journey through endless memories",
        duration: "3:45",
      },
    ],
  },
  {
    _id: "e5f6g7h8",
    name: "Drake",
    image: artist1,
    songs: [
      {
        id: 10,
        name: "Forevermore",
        image: timeless,
        file: timelessSong,
        desc: "An ode to everlasting moments",
        duration: "4:05",
      },
    ],
  },
  {
    _id: "i9j0k1l2",
    name: "Ariana Grande",
    image: artist1,
    songs: [
      {
        id: 11,
        name: "Infinity",
        image: timeless,
        file: timelessSong,
        desc: "Exploring limitless possibilities",
        duration: "3:15",
      },
    ],
  },
  {
    _id: "m3n4o5p6",
    name: "Ed Sheeran",
    image: artist1,
    songs: [
      {
        id: 12,
        name: "Perpetual",
        image: timeless,
        file: timelessSong,
        desc: "A tale of unending love",
        duration: "4:20",
      },
    ],
  },
  {
    _id: "q7r8s9t0",
    name: "Beyoncé",
    image: artist1,
    songs: [
      {
        id: 13,
        name: "Unceasing",
        image: timeless,
        file: timelessSong,
        desc: "Celebrating relentless spirit",
        duration: "3:50",
      },
    ],
  },
  {
    _id: "u1v2w3x4",
    name: "Bruno Mars",
    image: artist1,
    songs: [
      {
        id: 14,
        name: "Endless Groove",
        image: timeless,
        file: timelessSong,
        desc: "Dancing through infinite nights",
        duration: "3:30",
      },
    ],
  },
  {
    _id: "y5z6a7b8",
    name: "Billie Eilish",
    image: artist1,
    songs: [
      {
        id: 15,
        name: "Everlasting Echo",
        image: timeless,
        file: timelessSong,
        desc: "Whispers of the eternal void",
        duration: "4:10",
      },
    ],
  },
  {
    _id: "c9d0e1f2",
    name: "Shawn Mendes",
    image: artist1,
    songs: [
      {
        id: 16,
        name: "Ceaseless",
        image: timeless,
        file: timelessSong,
        desc: "A melody that never stops",
        duration: "3:25",
      },
    ],
  },
  {
    _id: "g3h4i5j6",
    name: "Katy Perry",
    image: artist1,
    songs: [
      {
        id: 17,
        name: "Unending Firework",
        image: timeless,
        file: timelessSong,
        desc: "Lighting up the endless sky",
        duration: "3:55",
      },
    ],
  },
];
