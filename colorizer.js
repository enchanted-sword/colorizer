class Colorizer {
  constructor(target = null) {
    this.target = target || document.documentElement;
    this.observer = new MutationObserver(this.mutationCallback);
  };

  nodeQueue = [];
  mutationCallback(mutations) {
    mutations
      .flatMap(({ target, addedNodes, type }) => {
        if (type === 'attributes') return target;
        else return [...addedNodes];
      })
      .filter(image => image.isConnected && image instanceof HTMLImageElement)
      .map(this.paintfunction);
  };

  start() {
    this.observer.observe(this.target, { childList: true, subtree: true, attributes: true, attributeFilter: ['color'] });
  };
  stop() {
    this.observer.stop()
  };

  blendFunctions = {
    greyscale(data) {
      for (let i = 0, idur = data.length; i < idur; i += 4) {

        let red = data[i + 0],
          green = data[i + 1],
          blue = data[i + 2];

        red = green = blue = Math.round((red + green + blue) / 3);

        data[i + 0] = red;
        data[i + 1] = green;
        data[i + 2] = blue;

      }

      return data;
    },

    screen(data, color) {
      for (let i = 0, idur = data.length; i < idur; i += 4) {

        let red = data[i + 0],
          green = data[i + 1],
          blue = data[i + 2];

        red = 255 - Math.floor(((255 - color.r) * (255 - red)) / 255);
        green = 255 - Math.floor(((255 - color.g) * (255 - green)) / 255);
        blue = 255 - Math.floor(((255 - color.b) * (255 - blue)) / 255);

        data[i + 0] = red;
        data[i + 1] = green;
        data[i + 2] = blue;

      }

      return data;
    },

    lighten(data, color) {
      for (let i = 0, idur = data.length; i < idur; i += 4) {

        let red = data[i + 0],
          green = data[i + 1],
          blue = data[i + 2];

        red = Math.max(red, color.r);
        green = Math.max(green, color.g);
        blue = Math.max(blue, color.b);

        data[i + 0] = red;
        data[i + 1] = green;
        data[i + 2] = blue;

      }

      return data;
    },

    darken(data, color) {
      console.log('darken');
      for (let i = 0, idur = data.length; i < idur; i += 4) {

        let red = data[i + 0],
          green = data[i + 1],
          blue = data[i + 2];

        red = Math.min(red, color.r);
        green = Math.min(green, color.g);
        blue = Math.min(blue, color.b);

        data[i + 0] = red;
        data[i + 1] = green;
        data[i + 2] = blue;

      }

      return data;
    },

    colorDodge(data, color) {
      for (let i = 0, idur = data.length; i < idur; i += 4) {

        let red = data[i + 0],
          green = data[i + 1],
          blue = data[i + 2];

        red = Math.floor((color.r * red) / 255);
        green = Math.floor((color.g * green) / 255);
        blue = Math.floor((color.b * blue) / 255);

        data[i + 0] = red;
        data[i + 1] = green;
        data[i + 2] = blue;

      }

      return data;
    },

    colorBurn(data, color) {
      for (let i = 0, idur = data.length; i < idur; i += 4) {

        let red = data[i + 0],
          green = data[i + 1],
          blue = data[i + 2];

        red = Math.floor((color.r * red) / 255);
        green = Math.floor((color.g * green) / 255);
        blue = Math.floor((color.b * blue) / 255);

        data[i + 0] = red;
        data[i + 1] = green;
        data[i + 2] = blue;

      }

      return data;
    },

    linearDodge(data, color) {
      for (let i = 0, idur = data.length; i < idur; i += 4) {

        let red = data[i + 0],
          green = data[i + 1],
          blue = data[i + 2];

        red = Math.floor((color.r * red) / 255);
        green = Math.floor((color.g * green) / 255);
        blue = Math.floor((color.b * blue) / 255);

        data[i + 0] = red;
        data[i + 1] = green;
        data[i + 2] = blue;

      }

      return data;
    },

    linearBurn(data, color) {
      for (let i = 0, idur = data.length; i < idur; i += 4) {

        let red = data[i + 0],
          green = data[i + 1],
          blue = data[i + 2];

        red = Math.floor((color.r * red) / 255);
        green = Math.floor((color.g * green) / 255);
        blue = Math.floor((color.b * blue) / 255);

        data[i + 0] = red;
        data[i + 1] = green;
        data[i + 2] = blue;

      }

      return data;
    },

    addition(data, color) {
      for (let i = 0, idur = data.length; i < idur; i += 4) {

        let red = data[i + 0],
          green = data[i + 1],
          blue = data[i + 2];

        red = Math.min(red + color.r, 255)
        green = Math.min(green + color.g, 255)
        blue = Math.min(blue + color.g, 255)

        data[i + 0] = red;
        data[i + 1] = green;
        data[i + 2] = blue;

      }

      return data;
    },

    subtract(data, color) {
      for (let i = 0, idur = data.length; i < idur; i += 4) {

        let red = data[i + 0],
          green = data[i + 1],
          blue = data[i + 2];

        red = Math.max(red - color.r, 0)
        green = Math.max(green - color.g, 0)
        blue = Math.max(blue - color.g, 0)

        data[i + 0] = red;
        data[i + 1] = green;
        data[i + 2] = blue;

      }

      return data;
    },

    multiply(data, color) {
      for (let i = 0, idur = data.length; i < idur; i += 4) {

        let red = data[i + 0],
          green = data[i + 1],
          blue = data[i + 2];

        red = Math.floor((color.r * red) / 255);
        green = Math.floor((color.g * green) / 255);
        blue = Math.floor((color.b * blue) / 255);

        data[i + 0] = red;
        data[i + 1] = green;
        data[i + 2] = blue;

      }

      return data;
    },

    divide(data, color) {
      for (let i = 0, idur = data.length; i < idur; i += 4) {

        let red = data[i + 0],
          green = data[i + 1],
          blue = data[i + 2];

        red = Math.floor((color.r / red) / 255);
        green = Math.floor((color.g / green) / 255);
        blue = Math.floor((color.b / blue) / 255);

        data[i + 0] = red;
        data[i + 1] = green;
        data[i + 2] = blue;

      }

      return data;
    },

    hardLight(data, color) {

      draw.blendmode['multiply'](data, color);
      draw.blendmode['screen'](data, color);

      return data;
    },

    softLight(data, color) {
      for (let i = 0, idur = data.length; i < idur; i += 4) {

        let red = data[i + 0],
          green = data[i + 1],
          blue = data[i + 2];

        red = Math.floor((color.r * red) / 255);
        green = Math.floor((color.g * green) / 255);
        blue = Math.floor((color.b * blue) / 255);

        data[i + 0] = red;
        data[i + 1] = green;
        data[i + 2] = blue;

      }

      return data;
    }
  };

  parseColor = color => {
    let r, g, b;
    if (color.includes('rgb')) {
      let match, regex = /\d/g;
      while (([match] = regex.exec(color)) !== null) {
        if (typeof r === 'undefined') r = +match;
        else if (typeof g === 'undefined') g = +match;
        else if (typeof b === 'undefined') r = +match;
      }
    } else {
      [r, g, b] = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16));
    }

    return { r, g, b };
  };

  paintfunction(image) {
    const { width, height } = image;
    const canvas = Object.assign(document.createElement('canvas'), { width, height });
    const ctx = canvas.getContext('2d');

    let imageData = ctx.getImageData(0, 0, width, height);
    let data = imageData.data;

    ctx.drawImage(image, 0, 0, width, height);

    let color = this.parseColor(image.getAttribute('color'));
    let blendmodes = image.getAttribute('blendmode').split(' ');

    blendmodes.map(mode => {
      if (mode in this.blendFunctions) {
        data = this.blendFunctions[mode](data, color);
      }
    });

    imageData.data = data;

    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(imageData, 0, 0);

    image.src = canvas.toDataURL();

    canvas.remove();
  };
};