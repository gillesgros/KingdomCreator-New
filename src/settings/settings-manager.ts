import {Settings} from "./settings"
import * as Cookie from "js-cookie";

export function loadSettings(): Settings {
  try {
/*	with js-cookie 2.2.1 */
    const options = Cookie.getJSON("options") || {};
/*	with js-cookie 3.0.2 
	const options = JSON.parse(Cookie.get("options")) || {};
	Cookie.getJSON("options") || {};
*/
    return Settings.createFromObject(options);
  } catch (e) {
    console.error("Failed to load settings: ", e);
    return Settings.createFromObject({});
  }
}

export function saveSettings(settings: Settings) {
  if (location.hostname.indexOf("localhost") == -1) {
/*	with js-cookie 2.2.1 */
    Cookie.set("options", settings, {
      expires: 365, 
      sameSite: "none", 
      secure: true
    });
/*	with js-cookie 3.0.2
    Cookie.set("options", settings, 
	  JSON.stringify({
        expires: 365, 
        sameSite: "none", 
        secure: true
      })
	);
 */	
  } else {
/*	with js-cookie 2.2.1 */
    Cookie.set("options", settings, {
      expires: 365, 
      sameSite: "strict", 
      secure: false
    });
/*	with js-cookie 3.0.2
    Cookie.set("options", settings, 
	  JSON.stringify({
        expires: 365, 
        sameSite: "strict", 
        secure: false
      })
	);
 */		
  }
}
