const mongoose = require("mongoose"); 

main().catch(err => console.log(err));
 
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/FruitsDB');

    const fruitSchema = new mongoose.Schema({
        name: {
            type: String, 
            required: [true, "Please check your data, no name is specificed!"]
        },
        rating: {
            type: Number, 
            min: 1, 
            max: 10
        }, 
        review: String
    }); 

    const Fruit = mongoose.model("Fruit", fruitSchema); 

    const fruit = new Fruit({
        rating: 7, 
        review: "Pretty solid as a fruit."
    }); 

    const personSchema = new mongoose.Schema({
        name: String, 
        age: Number,
        favoriteFruit: fruitSchema
    }); 

    // await fruit.save(); 

    const pineapple = new Fruit({
        name: "Pineapple", 
        rating: 7, 
        review: "Not bad on pizza!"
    }); 

    // await pineapple.save();

    const pear = new Fruit({
        name: "Pear", 
        rating: 9, 
        review: "Pretty solid fruit!"
    }); 

    // await pear.save();

    const Person = mongoose.model("Person", personSchema);

    const person = new Person({
        name: "Amy",  
        age: 17,
        favoriteFruit: pineapple
    });

    // await person.save();

    const kiwi = new Fruit({
        name: "Kiwi", 
        rating: 6, 
        review: "Quite ok food."
    }); 

    const orange = new Fruit({
        name: "Orange", 
        rating: 10, 
        review: "Super nice!"
    });  

    // await Fruit.insertMany([kiwi, orange]); 
    
    const fruits = await Fruit.find({}); 

    await Fruit.updateOne({name: "Orange"}, {name: "Peach"}); 
    await Fruit.deleteOne({name: "Peach"}); 
    // await Person.deleteMany({name: "John"}); 
    await Person.updateOne({name: "John"}, {favoriteFruit: pear}); 


    fruits.forEach(function(fruit){
        console.log(fruit.name);
    });

    mongoose.connection.close(); 
}
