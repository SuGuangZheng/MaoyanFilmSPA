/* eslint-disable prettier/prettier */
module.exports={
    publicPath:"/piaopiao",
    devServer:{
        proxy:{
            '/api':{
                target:'http://39.97.33.178',
                changeOrigin:true
            }
        }
    }
}