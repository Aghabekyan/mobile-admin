export class MapLoaderService {
  private static promise: Promise<any>;

  public static load(): Promise<any> {
    const browserKey = 'AIzaSyA_Dx_JMK0xRCU_w1N2ly48M9kdW7d8Mr8';
    const map = {
      URL: `https://maps.googleapis.com/maps/api/js?key=${browserKey}&libraries=geometry,drawing&callback=__onGoogleLoaded`
    };

    /*First time 'load' is called?*/
    if (!this.promise) {
      /*Make promise to load*/
      this.promise = new Promise(resolve => {
        this.loadScript(map.URL);
        /*Set callback for when google maps is loaded.*/
        window['__onGoogleLoaded'] = () => {
          resolve('google maps api loaded');
        };
      });
    }

    /*Always return promise. When 'load' is called many times, the promise is already resolved.*/
    return this.promise;
  }

  /*this function will work cross-browser for loading scripts asynchronously*/
  static loadScript(src, callback?): void {
    let s: any,
      r,
      t;
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.onload = s.onreadystatechange = function () {
      if (!r && (!this.readyState || this.readyState === 'complete')) {
        r = true;
        if (typeof callback === 'function') {
          callback();
        }
      }
    };
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
  }
}
