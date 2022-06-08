type MainColors = 'dark' | 'main';

const secondary_colors: {
  [K in MainColors]: string;
} = {
  dark: '#F4511E',
  main: '#FF6633',
};

const primary_colors: {
  [K in MainColors]: string;
} = {
  dark: '#252525',
  main: '#363636',
};

const GetSecondaryColor = (KEY: MainColors) => {
  return secondary_colors[KEY];
};

const GetPrimaryColor = (KEY: MainColors) => {
  return primary_colors[KEY];
};

export {GetSecondaryColor, GetPrimaryColor};
