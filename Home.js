
import Api  from "./Api.js";
import AddBook from "./AddBook.js";
import UpdateBook from "./UpdateBook.js";


class Home{



    constructor(){

        this.createTable();
        this.api= new Api();

        this.getAllBooks();

        this.getAllGenres();

        


        this.mybuton = document.querySelector('.buton');
        
        this.mybuton.addEventListener("click",this.showAddPage);

        this.title = document.querySelector('.tableBody');

        this.title.addEventListener('click',this.showBook);

        this.titleSortBtn = document.querySelector('.sortTitle');

        this.titleSortBtn.addEventListener('click', this.onTitleSort);

        this.authorInput = document.querySelector('.author');

        this.authorInput.addEventListener('change', this.onAuthorChange );

        this.findBookBtn = document.querySelector('.findBook');

        this.findBookBtn.addEventListener('click', this.onAutSearch);

        this.oldieBtn = document.querySelector('.findOldie');

        this.oldieBtn.addEventListener('click',this.onOldieSearch);

        this.box1 = document.querySelector('.box1');

        this.box1.addEventListener('change',this.onGenreChange);



        this.book={

            id: "",
            title: "",
            author: "",
            genre: "",
            year: ""


        }

        this.myAuthor = "";

        


    }
    // <optgroup label="searchGenre"></optgroup>


    createTable(){

        let container = document.querySelector('.container');

        container.innerHTML=`
        
        <table class = "myTable">
       
        <caption class="buton">Create Book</caption>
        <input type="button" value="Sort By Title" id="sortTitle" class="sortTitle">

       

        <label for="author">Author </label>
        <input type="text" id="author" class="author">
        <input type="button" value="Find" id="findBook" class="findBook">

        <input type="button" value="Oldie" id="findOldie" class="findOldie">


        <label for="box1">Search Genre</label>
     

        <select id= "box1" class="box1">
           
            
        </select>

      

      

        <thead>
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Genre</th>
                <th scope="col">Year</th>
            </tr>

        </thead>



        <tbody class="tableBody">
            
        </tbody>
    </table>
        
        
        `

        
    }

    populateTable(arr){

       let tableBody = document.querySelector('.tableBody');
       let text="";
       arr.forEach(element => {
   

            text+= `
            
                <tr>
                    <th class="titlu titlu-${element.id}" scope="row">${element.title}</th>
                    <td>${element.author}</td>
                    <td>${element.genre}</td>
                    <td>${element.year}</td>
                </tr>
                
            
            `
           
       });

       tableBody.innerHTML = text;


    }

   async getAllBooks (){

        let books = await this.api.getBooks();
        this.populateTable(books);
    }

    showAddPage(){


        new AddBook();

      
    }

    showTitle=(e)=>{

       let obj=e.target;

       if(obj.classList.contains("titlu")){

        let id=obj.className.split('-')[1];

        new UpdateBook(id);
        
       }


    }

    showBook=(e)=>{


        let obj = e.target;

        if(obj.classList.contains('titlu')){

            this.book={

                id:obj.className.split('-')[1],
                title: obj.textContent,
                author: obj.nextElementSibling.textContent,
                genre: obj.nextElementSibling.nextElementSibling.textContent,
                year: obj.nextElementSibling.nextElementSibling.nextElementSibling.textContent


            }
        }

        console.log(this.book);

        new UpdateBook(this.book);


    }

    onTitleSort = async ()=>{

      let sortedArr =  await this.api.sortedBookByTitle();

      this.populateTable(sortedArr);


    }

    onAuthorChange = (e)=>{

        let obj = e.target;

        if(obj.classList.contains('author')){


            // this.book.author = obj.value;

            this.myAuthor = obj.value;

           

           
        }


    }

    onAutSearch = async ()=>{

        let dasArray = await this.api.findBookByIAuthor(this.myAuthor);

        this.populateTable(dasArray);

    }

    onOldieSearch = async()=>{

        let otherArr = [];

        let oldieArray = await this.api.findoldie();

        otherArr.push(oldieArray);

        this.populateTable(otherArr);


    }

    populateDropDown(arr){

        let text="";

        arr.forEach((element) => {

            text+= `

                <option value=${element}>${element}</option>
            
        
            `
        });

    
    
        this.box1.innerHTML = text;


    }

    async getAllGenres(){

        let newArr = await this.api.myGenres();

        this.populateDropDown(newArr);



    }

    onGenreChange = async (e)=>{

        let obj = e.target;


        console.log(e.target.value);

        let genreArr = await this.api.findMyGenre(obj.value);

        this.populateTable(genreArr);


    }

    


}



export default Home;