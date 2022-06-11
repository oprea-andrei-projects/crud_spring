import Api from "./Api.js";
export default class UpdateBook{

    constructor(book){

        this.book = book;

        // this.id = book.id;

        console.log("das id ist " + this.book.id);

        this.api= new Api();

        this.addUpdateForm(this.book);

       
        this.updateForm = document.querySelector('.myUpdateForm');

        this.updateForm.addEventListener('change',this.onUpdateChange);
        
        console.log(this.book);

        this.updateBtn = document.querySelector('.newBook');

        this.updateBtn.addEventListener('click',this.performUpdate);

        this.deleteBtn = document.querySelector('.deleteBook');

        this.deleteBtn.addEventListener('click',this.onDelete);

       

    }



 addUpdateForm(carte){

 
        let myContainer = document.querySelector(".container");

        myContainer.innerHTML = `
              
            <h1>Update My Book</h1>

            <form class="myUpdateForm">
        
                <p>
                    <label for="title">Title</label>
                    <input name="title" type="text" id="title" class="title" value="${carte.title}">
                </p>
        
                <p>
                    <label for="author">Author</label>
                    <input name="author" type="text" id="author" class="author" value="${carte.author}">
                </p>
        
                <p>
                    <label for="genre">Genre</label>
                    <input name="genre" type="text" id="genre" class="genre" value="${carte.genre}">
                </p>
        
                <p>
                    <label for="year">Year</label>
                    <input name="year" type="number" id="year" class="year" value="${carte.year}">
                </p>
        
                <input type="button" value="Update Book" id="newBook" class="newBook">

                <input type="button" value="Delete Book" id="deleteBook" class="deleteBook">
        
                <input type="button" value="Cancel" id="cancel" class="cancel">

        
            </form>
        
        `
}

onUpdateChange = (e)=>{

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




}

performUpdate=(e)=>{


    this.api = new Api();

    this.api.updateBook(this.book);
    
}

onDelete = (e)=>{

    this.api = new Api();

    this.api.deleteDasBook(this.book.id);

}



}