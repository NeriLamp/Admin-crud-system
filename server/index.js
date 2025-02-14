const express = require ("express"); 
const app = express(); 
const mongoose=require('mongoose');
const UserModel=require("./models/Users");
const ProductModel = require('./models/Product');
const cors=require('cors'); 

app.use(express.json());
app.use(cors()); 

mongoose.connect("mongodb+srv://NL:nl@cluster0.dyhy2.mongodb.net/DB?retryWrites=true&w=majority&appName=Cluster0");

app.listen(3001, () => { 
    console.log("Serveris tinkamai veikia"); 
    });
app.get("/getUsers", (req, res)=>{ 
        UserModel.find().then(function(response){ 
            res.json(response);   
        }).catch(function(err){ 
            res.json(err); 
      
        }) 
        });
app.post("/createUser", async (req, res)=>{ 
            const user = req.body; 
            const newUser = new UserModel (user); 
            await newUser.save(); 
            res.json(user) 
            }); 

app.delete("/deleteUser/:id", async (req, res) => { 
                try {
                    const userId = req.params.id; // Paimkite vartotojo ID iš užklausos parametrų
                    await UserModel.findByIdAndDelete(userId); // Ištrinkite vartotoją pagal ID
                    res.status(200).json({ message: "Vartotojas sėkmingai ištrintas" });
                } catch (error) {
                    res.status(500).json({ message: "Klaida trinant vartotoją", error });
                }
            });
app.get('/getProducts', async (req, res) => {
                try {
                    const products = await ProductModel.find();
                    res.status(200).json(products);
                } catch (err) {
                    res.status(500).json({ message: 'Klaida gaunant produktus', error: err });
                }
            });
app.post('/createProduct', async (req, res) => {
                try {
                    const product = req.body;
                    const newProduct = new ProductModel(product);
                    await newProduct.save();
                    res.status(201).json(newProduct);
                } catch (err) {
                    res.status(500).json({ message: 'Klaida kuriant produktą', error: err });
                }
            });
            
app.delete("/deleteProduct/:id", async (req, res) => {
                try {
                    const productId = req.params.id; // Gauti produkto ID iš užklausos parametrų
                    await ProductModel.findByIdAndDelete(productId); // Ištrinti produktą iš duomenų bazės
                    res.status(200).json({ message: "Produktas sėkmingai ištrintas" });
                } catch (error) {
                    res.status(500).json({ message: "Klaida trinant produktą", error });
                }
            });
app.put("/updateUser/:id", async (req, res) => {
                try {
                  const userId = req.params.id; // Gauname vartotojo ID iš užklausos URL
                  const updatedData = req.body; // Nauji duomenys, kuriuos siunčia klientas
              
                  const updatedUser = await UserModel.findByIdAndUpdate(
                    userId,
                    updatedData,
                    { new: true } // Grąžins atnaujintą vartotoją
                  );
              
                  if (!updatedUser) {
                    return res.status(404).json({ message: "Vartotojas nerastas" });
                  }
              
                  res.status(200).json(updatedUser); // Grąžina atnaujintą vartotoją
                } catch (error) {
                  res.status(500).json({ message: "Klaida atnaujinant vartotoją", error });
                }
              });
app.put("/updateProduct/:id", async (req, res) => {
                try {
                    const productId = req.params.id; // Gauname produkto ID iš užklausos URL
                    const updatedData = req.body; // Nauji duomenys, kuriuos siunčia klientas
            
                    const updatedProduct = await ProductModel.findByIdAndUpdate(
                        productId,
                        updatedData,
                        { new: true } // Grąžina atnaujintą produktą
                    );
            
                    if (!updatedProduct) {
                        return res.status(404).json({ message: "Produktas nerastas" });
                    }
            
                    res.status(200).json(updatedProduct); // Grąžina atnaujintą produktą
                } catch (error) {
                    res.status(500).json({ message: "Klaida atnaujinant produktą", error });
                }
            });
            
              
            
            