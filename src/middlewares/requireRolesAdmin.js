module.exports = (req,res,next) => {
    console.log(req.user.role);
    if (req.user.role !== 'admin'){
        return res.status(403).json({
            success:false,
            message:'acces interdit role admin uniquement',
            data: null
        })
    }
    next();
}