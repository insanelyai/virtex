import jwt from "jsonwebtoken"

export async function gettoken(request) {
    try {
        const token = request.cookies.get('user')?.value;
        
        if(!token) {
            return false
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);

      

       if(!payload) {
        return false
       }

       return payload 


    } catch (error) {
        console.error(error);
    }
}