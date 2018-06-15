var currentTheme = '';

const themes = {
  'morning': {
    images: {
      headerURL: 'morning.png',
    },
    colors: {
      accentcolor: '#CF723F',
      textcolor: '#111',
    }
  },
  'afternoon': {
    images: {
      headerURL: 'afternoon.png',
    },
    colors: {
      accentcolor: '#CF723F',
      textcolor: '#111',
    }
  },
  'evening': {
    images: {
      headerURL: 'evening.png',
    },
    colors: {
      accentcolor: '#CF723F',
      textcolor: '#111',
    }
  },
  'midnight': {
    images: {
      headerURL: 'midnight.png',
    },
    colors: {
      accentcolor: '#000',
      textcolor: '#fff',
    }
  }
};

function setTheme(theme) {
  if (currentTheme === theme) {
    // No point in changing the theme if it has already been set.
    return;
  }
  currentTheme = theme;
  browser.theme.update(themes[theme]);
}

function checkTime() {
  let date = new Date();
  let hours = date.getHours();
  // Will set the sun theme between 8am and 8pm.
  if ((hours > 6) && (hours < 12)) {
    setTheme('morning');
  }
 else if ((hours > 12) && (hours < 18)) {
    setTheme('afternoon');
  }
  else if ((hours > 18) && (hours < 24)) {
     setTheme('evening');
   }
  else {
    setTheme('midnight');
  }
}

// On start up, check the time to see what theme to show.
checkTime();

// Set up an alarm to check this regularly.
browser.alarms.onAlarm.addListener(checkTime);
browser.alarms.create('checkTime', {periodInMinutes: 5});
