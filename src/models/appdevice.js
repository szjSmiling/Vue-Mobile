export const AppBridge = {
  device:0,
  getNativeSource(vueCom){
    return new Promise((resolve, reject) =>{
      try {
        if(window.heg.getNativeSource()){
          let data = typeof window.heg.getNativeSource() === "string"
            ? JSON.parse(window.heg.getNativeSource())
            : window.heg.getNativeSource();
          this.device = data.deviceType;
          resolve(false);
          return false;
        }
      } catch (e) {
        if(window.WebViewJavascriptBridge){
          vueCom.$bridge.callhandler('getNativeSource',null,(data)=>{
            this.device = data.deviceType;
            resolve(false);
            return false;
          });
        }else{
          resolve(true);
          return true;
        }
      }
    })
  },
}