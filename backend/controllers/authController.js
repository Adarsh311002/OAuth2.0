import  {User}  from "../models/usermodel.js";
import { oauth2client } from "../utils/googleConfig.js";
import axios from 'axios';
import jwt from 'jsonwebtoken'

const googleLogin = async (req,res) => {
    try {
        const {code} = req.query;
         const googleRes = await oauth2client.getToken({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: 'postmessage'
    });
        oauth2client.setCredentials(googleRes.tokens)

        const userRes = await axios.get(
  `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
//   `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
);


        const {email,name,picture} = userRes.data;

        let user = await User.findOne({email});

        if(!user){
            user = await User.create({
                name,
                email,
                image : picture
            })

        }

        const {_id} = user;

        const token = jwt.sign({_id,email},
            process.env.JWT_SECRET,
            {
                expiresIn : process.env.JWT_TIMEOUT
            }
        );

        return res.status(200).json({
            message : 'success',
            token,
            user
        })


    } catch (err) {
        res.status(500).json({
            message : 'Internal Server error',
            error : err
        })
    }
}

export {
    googleLogin
}

