const db = require('../models');
const Book = db.Book;
const Type = db.Type;
const {validateCreateBook, validateUpdateBook} = require('../utils/bookValidation');

function parseId(params) {
    const id = Number(params.id);
    if(!Number.isInteger(id) || id <= 0){
        return null
    }
    return id;
}

//affiche tous les livres
exports.listBooks = async (req,res) => {
    try {
        //avec l'orm get tous les livres dans ma variable books
        const books = await Book.findAll(
            {
                order: [
                    ["title", "ASC"]
                ], 
                include: [
                    { 
                        model: Type, 
                        as: 'type', 
                        attributes: ['id', 'name']
                    }
                ] 
            }
        );

        return res.status(200).json({
            success: true,
            Message: "liste des livres",
            data: books
        })
    } catch (error) {
        console.log("erreur liste books", error);
        return res.status(500).json({
            success: false,
            Message: "erreur interne lors de la recuperation des livres",
            data: null
        })
    }
}

//recupere aussi le type des book
exports.getBookById = async (req, res) => {
    try {
        const id = parseId(req.params);

        if(!id){
            return res.status(400).json({
                success:false,
                message:'id non valide',
                data: null
            })
        }

        const book = await Book.findByPk(id, {
            include: [
                {
                    model: Type, 
                    as: "type", 
                    attributes: ["id", "name"]
                }
            ]
        });

        if(!book){
            console.log('book introuvable!');
            return res.status(400).json({
                success: false,
                message: "book introuvable",
                data: null
            })
        }

        return res.status(200).json({
            success:true,
            message:"livre trouvé",
            data: book
        })

    } catch (error) {
        console.error('echec interne lors de laffichage du livre', error);
        return res.status(500).json({
            success: false,
            message: 'erreur interne lors de laffichage du lvire',
            data: null
        })
    }
}

//voir les modifications a faire pour integrer la relation avec book 
exports.createdBook = async (req,res) => {
    try {
        
        const errors = validateCreateBook(req.body);

        if(errors.length > 0){
            return res.status(400).json({
                success: false,
                message: 'erreur de validation des entrées',
                data: errors
            })
        }

        const payload = {
            title: req.body.title.trim(),
            author: req.body.author.trim(),
            dispo: typeof req.body.dispo === 'boolean' ? req.body.dispo : true
        };

        const newbook = await Book.create(payload);

        return res.status(200).json({
            success: true,
            message: 'livre créé',
            data: newbook
        })
    } catch (error) {
        console.error('echec interne lors de la creation du livre', error);
        return res.status(500).json({
            success: false,
            message: 'erreur interne lors de la creation du lvire',
            data: null
        })
        
    }
}

//ici aussi
exports.updateBook = async (req,res) => {
    try {
        const id =parseId(req.params);
        if(!id){
            return res.status(400).json({
                success:false,
                message:'id non valide',
                data: null
            })
        }
        const errors = validateUpdateBook(req.body);
        if( errors.length > 0){
            console.log("erreur de validation");
            return res.status(400).json({
                success:false,
                message:"erreur dans la verif des entrées",
                data: errors      
            })
        }

        const book = await Book.findByPk(id);

        if(!book){
            console.log('book introuvable!');
            return res.status(400).json({
                success: false,
                message: "book introuvable",
                data: null
            })
        }
        if (typeof req.body.title === "string"){
            book.title = req.body.title.trim();
        }
        if (typeof req.body.author === "string"){
            book.author = req.body.author.trim();
        }
        if (typeof req.body.dispo === "boolean"){
            book.dispo = req.body.dispo
        }
        await book.save();

        return res.status(200).json({
            success:true,
            message:"top reussite",
            data: book
        })
    } catch (error) {
        console.error('echec interne lors de la modification du livre', error);
        return res.status(500).json({
            success: false,
            message: 'erreur interne lors de la modification du lvire',
            data: null
        })
    }
}

//tout pareil
exports.deleteBook = async (req, res) => {
    try {
        const id = parseId(req.params);
        if(!id){
            return res.status(400).json({
                success:false,
                message:"id pas bon",
                data: null
            })
        }

        const book = await Book.findByPk(id);
        if(!book){
            return res.status(404).json({
                success:false,
                message: "livre introuvable",
                data:null
            });
        }

        await book.destroy();

        return res.status(204).json();

    } catch (error) {
        console.error('echec interne lors de la suppression du livre', error);
        return res.status(500).json({
            success: false,
            message: 'erreur interne lors de la suppresion du lvire',
            data: null
        })
    }
}
