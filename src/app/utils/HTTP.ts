export default class HTTP {
    
    static GetRequest = async (url:string) =>{
        return await fetch(url, {
            method: 'get'
        });
    }

    static PostRequest = async (url:string, body:any) =>{
        debugger;
        return await fetch(url, {
            method: 'post',
            body: body,
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
              }
        });
    }
}