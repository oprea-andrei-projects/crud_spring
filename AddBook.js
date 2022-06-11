import Api from "./Api.js";

export default class AddBook{

    constructor(){

        this.addForm();
        this.api= new Api();


        this.myForm = document.querySelector('.myForm');

        this.title = document.querySelector('.title');
        this.author = document.querySelector('.author');
        this.genre = document.querySelector('.genre');
        this.year = document.querySelector('.year');

        this.myForm.addEventListener('change',this.onChange);

        this.createButton = document.querySelector('.newBook');

        this.createButton.addEventListener('click',this.onCreate);

        this.title.addEventListener('click',)


        this.errors=[];

        this.book={

            title:"",
            author:"",
            genre:"",
            year:""
        };
    }

    addForm(){

        let myDoc = document.querySelector(".container");

        myDoc.innerHTML = `
              
            <h1>New Book</h1>

            <form class="myForm">
        
                <p>
                    <label for="title">Title</label>
                    <input name="title" type="text" id="title" class="title">
                </p>
        
                <p>
                    <label for="author">Author</label>
                    <input name="author" type="text" id="author" class="author">
                </p>
        
                <p>
                    <label for="genre">Genre</label>
                    <input name="genre" type="text" id="genre" class="genre">
                </p>
        
                <p>
                    <label for="year">Year</label>
                    <input name="year" type="number" id="year" class="year">
                </p>
        
                <input type="button" value="Create New Book" id="newBook" class="newBook">
        
                <input type="button" value="Cancel" id="cancel" class="cancel">

        
            </form>
        
        `
    }



    onChange=(e)=>{

      
        let obj = e.target;

        if(obj.classList.contains("title")){

            this.book.title = obj.value;    

        }else if (obj.classList.contains("author")){

            this.book.author = obj.value;

        }else if(obj.classList.contains("genre")){

            this.book.genre = obj.value;

        }else if(obj.classList.contains("year")){

            this.book.year = obj.value;

        }

        this.valid();

    }
  


    onCreate=()=>{

        console.log(this.book);

        this.valid();

        if(this.errors.length==0){

            this.api.createBook(this.book);


        }else{

            this.errors.forEach(e=>alert(e));
        }

    }


    valid(){

        this.errors=[];

        if(this.book.title==""){
            this.errors.push("title is missing");
        }
        if(this.book.author==""){

            this.errors.push("author is missing");
        }
        if(this.book.genre==""){

            this.errors.push("genre is missing");
        }
        if(this.book.year==""){

            this.errors.push("year is missing / is not a number");
        }

        
    }

   

}