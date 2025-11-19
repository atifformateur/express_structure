//outil pour decoder et verifier les token jwt
const jwt = require('jsonwebtoken');

module.exports = (req,res, next) => {
    //get authorization dans le header de ma request
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer')){
        return res.status(401).json({success:false,message:'pas de token trouvé', data:null});
    }

    //extraire la partie qui nous interesse
    //extraire la partie APRES le bearer
    const token = header.split(' ')[1];

    try {
        //verifie le token et sa durée de vie
        const payload = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = payload;

        //laisse passer vers la route proteger
        return next();
    } catch (error) {
        return res.status(401).json({success:false, message:'token invalide'})
    }
}