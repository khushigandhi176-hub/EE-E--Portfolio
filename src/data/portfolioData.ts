export interface LabVideoDemo {
  id: string;
  label: string;
  caption: string;
  videoSrc: string;
  thumbnailSrc: string;
  duration: string;
  orientation: 'landscape' | 'portrait';
  featuredNote?: string;
}

export interface PatternItem {
  number: string;
  title: string;
  description: string;
}

export interface ComponentSpec {
  name: string;
  role: string;
  detail: string;
}

export interface CourseProject {
  id: string;
  title: string;
  category: string;
  summary: string;
  mediaType: 'gallery' | 'video-and-image' | 'videos';
  primaryImage: string;
  primaryAlt: string;
  secondaryImages?: { src: string; alt: string; label: string }[];
  videoSrc?: string;
  videoLabel?: string;
  extraVideos?: { src: string; thumbnail: string; label: string; duration: string }[];
}

export const LAB_INTRO =
  'Throughout my Engineering Exploration course, I participated in hands-on laboratory activities involving Arduino programming, electronic components, circuit connections and hardware demonstrations. These activities helped me understand how programming instructions translate into real-world electronic outputs.';

export const EXPERIMENT_01 = {
  code: 'Experiment 01',
  title: 'Arduino-Based LED Interfacing and Blinking Patterns',
  categories: ['Arduino', 'Basic Electronics', 'Programming'],
  objective:
    'To understand how multiple LEDs can be connected to an Arduino UNO and controlled through programmed digital output signals.',
  workingPrinciple: [
    'The LEDs are connected to the Arduino board through digital pins. The Arduino executes the uploaded program and controls when individual LEDs turn ON and OFF.',
    'Different blinking sequences are created using digital output instructions and timing delays.',
  ],
  recordedCodeNote:
    'One of the recorded code demonstrations uses four LED pins (8, 9, 10 and 11), alternating LED pairs and a 500-millisecond delay.',
  components: [
    {
      name: 'Arduino UNO',
      role: 'Microcontroller Board',
      detail: 'Executes uploaded C/C++ sketch and outputs 5V digital signals on pins 8–11.',
    },
    {
      name: 'Four LEDs',
      role: 'Visual Output Indicators',
      detail: 'Light-emitting diodes wired across breadboard rows to display digital states.',
    },
    {
      name: 'Breadboard',
      role: 'Prototyping Platform',
      detail: 'Solderless terminal strips and common ground bus for rapid circuit assembly.',
    },
    {
      name: 'Connecting wires',
      role: 'Signal & Ground Conductors',
      detail: 'Jumper wires linking digital output pins 8, 9, 10, 11 and GND to the LED array.',
    },
    {
      name: 'USB connection for programming and power',
      role: 'Host Interface & 5V Supply',
      detail: 'Uploads compiled Arduino IDE code and supplies regulated operating power.',
    },
  ] as ComponentSpec[],
  patterns: [
    {
      number: '01',
      title: 'Sequential LED Blinking',
      description: 'LEDs illuminate one after another.',
    },
    {
      number: '02',
      title: 'Alternating LED Blinking',
      description: 'Different LED pairs illuminate alternately.',
    },
    {
      number: '03',
      title: 'Multiple LED Patterns',
      description: 'Different combinations of LEDs are controlled through programmed instructions.',
    },
    {
      number: '04',
      title: 'Timing-Based LED Control',
      description: 'Delay intervals control how long the LEDs remain ON or OFF.',
    },
  ] as PatternItem[],
  learningOutcomes: [
    'How to interface LEDs with an Arduino UNO.',
    'How digital output pins control electronic components.',
    'How timing and delay functions influence LED behavior.',
    'How programming logic creates different output sequences.',
    'Basic circuit connections and hardware testing.',
  ],
  keyTakeaway:
    'This activity strengthened my understanding of Arduino-based hardware interfacing and demonstrated how basic programming concepts can be applied to control physical electronic components.',
};

export const LAB_DEMONSTRATION_VIDEOS: LabVideoDemo[] = [
  {
    id: 'demo-01',
    label: 'Demonstration 01',
    caption:
      'Recorded demonstration of Arduino LED blinking and alternating pair sequencing using four digital output pins (8, 9, 10 and 11) with a 500 ms delay interval.',
    videoSrc: '/assets/muted/demo-01.mp4',
    thumbnailSrc: '/assets/thumbnails/demo-01.jpg',
    duration: '0:06',
    orientation: 'landscape',
    featuredNote: 'Pins 8, 9, 10, 11 · 500 ms Alternating Pairs',
  },
  {
    id: 'demo-02',
    label: 'Demonstration 02',
    caption:
      'Laboratory demonstration of Arduino UNO digital output driving multi-LED blinking and sequential illumination patterns on a breadboard.',
    videoSrc: '/assets/muted/demo-02.mp4',
    thumbnailSrc: '/assets/thumbnails/demo-02.jpg',
    duration: '0:12',
    orientation: 'portrait',
  },
  {
    id: 'demo-03',
    label: 'Demonstration 03',
    caption:
      'Hardware demonstration showing four breadboard LEDs blinking in programmed timing cycles controlled by the Arduino UNO.',
    videoSrc: '/assets/muted/demo-03.mp4',
    thumbnailSrc: '/assets/thumbnails/demo-03.jpg',
    duration: '0:07',
    orientation: 'portrait',
  },
  {
    id: 'demo-04',
    label: 'Demonstration 04',
    caption:
      'Recorded demonstration of Arduino LED sequencing patterns alongside the uploaded digital output loop and breadboard circuit setup.',
    videoSrc: '/assets/muted/demo-04.mp4',
    thumbnailSrc: '/assets/thumbnails/demo-04.jpg',
    duration: '0:12',
    orientation: 'portrait',
  },
  {
    id: 'demo-05',
    label: 'Demonstration 05',
    caption:
      'Close-up laboratory demonstration of Arduino UNO wiring, USB power connection, and timed LED blinking output across four channels.',
    videoSrc: '/assets/muted/demo-05.mp4',
    thumbnailSrc: '/assets/thumbnails/demo-05-uno.jpg',
    duration: '0:07',
    orientation: 'portrait',
  },
];

export const COURSE_PROJECTS: CourseProject[] = [
  {
    id: 'rain-detection',
    title: 'Rain Detection System Prototype',
    category: 'Sensors · Arduino UNO · Alert Circuit',
    summary:
      'An Arduino UNO rain-sensing prototype connecting a rain sensor module (AO to A0) with an indicator LED on pin 7 and an audible buzzer alert on pin 8, mounted inside a physical scale model.',
    mediaType: 'gallery',
    primaryImage: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_2.43.54_PM_1c52ab5a.jpeg',
    primaryAlt: 'Physical model of the Arduino UNO Rain Detection System with rain sensor mounted on roof',
    secondaryImages: [
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_2.43.54_PM_1c52ab5a.jpeg',
        alt: 'Physical prototype model of the Rain Detection System',
        label: 'Physical Model',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-17_at_2.42.08_PM_d13cc42c.jpeg',
        alt: 'Rain Detection System circuit diagram showing Arduino UNO, Rain Sensor, LED pin 7 and Buzzer pin 8',
        label: 'Circuit Diagram',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-18_at_2.19.43_PM_4a3123f1.jpeg',
        alt: 'Engineering student team presenting the working Rain Detection System prototype',
        label: 'Team Presentation',
      },
    ],
  },
  {
    id: 'bluetooth-control',
    title: 'Bluetooth LED Control Interface',
    category: 'Wireless Communication · Arduino UNO',
    summary:
      'Mobile Bluetooth Control App communicating wirelessly with an Arduino UNO via serial commands to toggle an LED ON and OFF while logging received byte states in the Serial Monitor.',
    mediaType: 'video-and-image',
    primaryImage: '/assets/aistudio/WhatsApp_Image_2026-11-19_at_5.24.55_PM_817dc89b.jpeg',
    primaryAlt: 'Bluetooth Control App on mobile phone paired with Arduino UNO and Serial Monitor',
    videoSrc: '/assets/muted/project-bluetooth.mp4',
    videoLabel: 'Silent Bluetooth Control Recording (0:35)',
  },
  {
    id: 'ultrasonic-sensor',
    title: 'Ultrasonic Distance Measurement & LED Trigger',
    category: 'HC-SR04 Sensor · Threshold Logic',
    summary:
      'Interfacing an HC-SR04 ultrasonic sensor with Arduino UNO to calculate real-time object distance in centimeters on the Serial Monitor and trigger an indicator LED when distance drops to 10 cm or less.',
    mediaType: 'videos',
    primaryImage: '/assets/thumbnails/project-ultrasonic-led.jpg',
    primaryAlt: 'Arduino UNO and HC-SR04 ultrasonic sensor triggering green LED on breadboard',
    extraVideos: [
      {
        src: '/assets/muted/project-ultrasonic-led.mp4',
        thumbnail: '/assets/thumbnails/project-ultrasonic-led.jpg',
        label: 'Threshold LED Trigger (0:12)',
        duration: '0:12',
      },
      {
        src: '/assets/muted/project-ultrasonic-serial.mp4',
        thumbnail: '/assets/thumbnails/project-ultrasonic-serial.jpg',
        label: 'Live Distance Readings (0:12)',
        duration: '0:12',
      },
    ],
  },
  {
    id: 'mit-calculator',
    title: 'MIT App Inventor Calculator App',
    category: 'Mobile UI · Visual Block Programming',
    summary:
      'A mobile calculator application built in MIT App Inventor featuring dual numeric input fields, arithmetic operator controls (+, −, *, /), and event-driven block logic verified on an Android device.',
    mediaType: 'gallery',
    primaryImage: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_4.52.35_PM_c39d6972.jpeg',
    primaryAlt: 'MIT App Inventor Designer screen showing Calculator App mobile interface layout',
    secondaryImages: [
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_4.52.35_PM_c39d6972.jpeg',
        alt: 'MIT App Inventor Designer view for the Calculator App',
        label: 'Designer Layout',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_4.52.35_PM__1__fd6c41c1.jpeg',
        alt: 'MIT App Inventor Blocks logic for addition, subtraction, multiplication and division',
        label: 'Block Code',
      },
    ],
    videoSrc: '/assets/muted/project-calculator.mp4',
    videoLabel: 'Silent App Test Recording (0:13)',
  },
  {
    id: 'potentiometer-analog',
    title: 'Arduino Analog Input & Potentiometer Wiring',
    category: 'Analog Electronics · Hardware Interfacing',
    summary:
      'Direct breadboard-free wiring of a three-terminal rotary potentiometer across Arduino UNO 5V, GND, and Analog Input pin A0 to study variable voltage input.',
    mediaType: 'video-and-image',
    primaryImage: '/assets/aistudio/WhatsApp_Image_2026-11-20_at_4.52.36_PM_7bd867c0.jpeg',
    primaryAlt: 'Close-up of potentiometer jumper wires connected to Arduino UNO Power and Analog In pins',
    videoSrc: '/assets/muted/project-potentiometer.mp4',
    videoLabel: 'Silent Wiring Clip (0:06)',
  },
];
