export default class HTTP {
    
    static GetRequest = async (url:string) =>{
        return await fetch(url, {
            method: 'get'
        });
    }

    static PostRequest = async (url:string, body:any) =>{
        try {
            return await fetch(url, {
                method: 'post',
                body: body,
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json'
                  }
            });
        } catch (error) {
            return {ok:false, text: ()=>{return "no"}, json: ()=>{return "no"}};
        }
    }
}