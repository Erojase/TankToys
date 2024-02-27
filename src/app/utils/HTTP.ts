export default class HTTP {
    
    static GetRequest = async (url:string) =>{
        return await fetch(url, {
            method: 'get'
        });
    }

    static PostRequest = async (url:string, body:string) =>{
        return await fetch(url, {
            method: 'post',
            body: body
        });
    }
}