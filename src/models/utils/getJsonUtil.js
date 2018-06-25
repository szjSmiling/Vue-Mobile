export let getJsonUtil = {
	domainJson(){
		// return new Promise((resolve,reject)=>{
         //    XHR.get('domain/domain.json').then((res)=>{
		// 		resolve(res);
		// 	},(error)=>{
		// 		reject(error);
		// 	})
		// })

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && (xhr.status < 300 || xhr.status === 304)) {
                        if (xhr.responseText) {
                            resolve(JSON.parse(xhr.responseText));
                        } else {
                            resolve(xhr.responseText);
                        }
                    } else {
                        reject(`XHR unsuccessful:${xhr.status}`);
                    }
                }
            }
            xhr.open('get', 'domain/domain.json', true);
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(null);

        })
	}
}