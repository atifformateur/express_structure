const db = require('../models');
const Product = db.Product;

//logique d'affichage des produits
exports.listProducts = async (req, res)=>{
    try{
        const products = await Product.findAll();

        res.status(200).json({
            success: true,
            message: 'liste des produits',
            data: products
        });
    }catch(error){
        console.log('erreur pour get products', error);
        res.status(500).json({
            success:false,
            message:"error sur get products",
            data:null
        })
    }
};

//logique affichage d'un produits
exports.getProductById = async (req, res)=>{
    try{
         //number converti de string en nombre
        const id = Number(req.params.id);
        //recherche du produit
        const product = await Product.findByPk(id);
        //gestion d'erreur si pas de produit trouvé
        if(!product){
            res.status(404).json({
                success: false,
                message: "produit non trouvé",
                data: null
            })
        };
        //200 produit trouvé
        res.status(200).json({
            success:true,
            message: 'produit trouvé',
            data: product
        });
    }catch(error){
        console.log('error sur find by id product', error);
        res.status(500).json({
            succes:false,
            message:'error sur get by product',
            data:null
        })
    }
   
}

//ajout d'un produit
exports.createProduct = async (req, res)=>{
    try{
            const {name, price} = req.body;
    
        //validation des données
        if(!name || !price || typeof price !== 'number' ){
            res.status(400).json({
                success:false,
                message:'name string et price int obligatoire',
                data: null
            });
        };

        //verifier que le prix ne soit pas negatif

        //creation du produit pour la db
        const newProduct = await Product.create({
            name: name,
            price: price
        })
    
        res.status(201).json({
            success: true,
            message: 'produit crée',
            data: newProduct
        })
    }catch(error){
        console.log('error sur creation de product', error);
        res.status(500).json({
            succes: false,
            message:'error sur la creation product',
            data:null
        })
    }
}

//update d'un produit
exports.updateProduct = async (req, res) => {
    try{
        //number converti de string en nombre
        const id = Number(req.params.id);
        const {name, price} = req.body;

        //recherche du produit en db
        const product = await Product.findByPk(id);

        if(!product){
            res.status(404).json({
                success:false,
                message:'produit pas la en vacance',
                data:null
            })
        }
        
        //verification name et price a faire 

        //executer les modfis
        product.name = name;
        product.price = price;

        await product.save();

        res.status(200).json({
            succes:true,
            message: 'produit ajouté',
            data: product
        })
    }catch(error){
        console.log('error sur le update de prodcut', error);
        res.status(500).json({
            succes:false,
            message:'error sur update product',
            data:null
        })
    }
}

exports.deleteProduct = async (req,res) => {
    try{
        const id = Number(req.params.id);

        //recherche du produit en db
        const product = await Product.findByPk(id);

        if(!product){
            res.status(404).json({
                success:false,
                message:'produit pas la en vacance',
                data:null
            })
        }

        await product.destroy();

        res.status(204).json({
            succes:true,
            message:' on lui a destroy sa gentille maman',
            data: null
        })

    }catch(error){
        console.log('error sur la suppr de prodcut', error);
        res.status(500).json({
            succes:false,
            message:'error sur delete product',
            data:null
        })  
    }
}

//logique test
exports.test = async (req, res) =>{
    try{
        //verifier la connexion 
        await db.sequelize.authenticate();

        //verifier que le model foncitonne
        const products = await Product.findAll({limit:1});

        res.status(200).json({
            success:true,
            message:'test de ma table product',
            data: products
        })
    }catch(error){
        console.error('erreur dans le test de product', error);
        res.status(500).json({
            success:false,
            message:'echec lors du test de product',
            error: error.message
        })
    }
};

