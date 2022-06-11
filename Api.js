class Api{



    constructor(){
       
    }

    api(path, method='GET', body=null, requiresAuth = false, credentials = null){

        const url ="http://localhost:8080/" + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest'
            },

        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }
        if (requiresAuth) {
            const encodedCredentials = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options);


    }



    async getBooks(){

        return this.api("allBooks").then(data=>data.json());
    }



    async createBook(book){

        let data = await this.api("addBook",'POST',book);
    }

    async updateBook(book){

        let data2 = await this.api(`updateBook`,'PUT',book);

    }

    async findBookById(id){


        let data3 = await this.api(`findBook/${id}`,'GET');


        return data3.json();
    }

    async deleteDasBook(id){


        await this.api(`deleteBook/${id}`,`DELETE`);
    }

    async sortedBookByTitle(){


        return this.api(`sortBooksByTitle`,`GET`).then(data=>data.json());

    }

    async findBookByIAuthor(author){

        return this.api(`getBooksByAuthor/${author}`,`GET`).then(data=>data.json());

    }

    async findoldie(){

        return this.api(`getOldestBook`,`GET`).then(data=>data.json());
    }

    async myGenres(){

        return this.api(`allGenres`,`GET`).then(data=>data.json());
    }

    async findMyGenre(genre){

        return this.api(`findByGenre/${genre}`,`GET`).then(data=>data.json());
    }





}



export default Api;