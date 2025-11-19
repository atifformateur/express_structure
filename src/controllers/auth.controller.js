const authService = require('../services/auth.service');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
    //recupere les erreurs generer par registerRules
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //stop si jamais payload invalide
        return res.status(400).json({
            success:false,
            errors: errors.array()
        })
    }
    try {
        // get infos et les enregistrer en bdd
        const user = await authService.register(req.body);
        return res.status(201).json({
            success:true,
            message: 'user crée avec succes',
            data: {
                id: user.id,
                email: user.email
            }
        })
    } catch (error) {
        if(error.name === 'SequelizeUniqueConstraintError'){
            return res.status(409).json({
                success:false,
                message:'clé unique mail deja utilisé',
                data:null
            })
        }
        return res.status(500).json({
            success: false,
            message:'erreur interne',
            data:null
        })
    }
}

exports.login = (req, res) => {
    console.log('test login');
    
}