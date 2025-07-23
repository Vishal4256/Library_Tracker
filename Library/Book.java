/*
 * All the things related to books
 * 1. Name
 * 2. Author
 * 3. IsBorrowed
 */

 public class Book{
    private String name;
    private String author;
    private boolean isBorrowed;

    public Book(String name, String author){
        this.name=name;
        this.author=author;
        this.isBorrowed=false;
    }

    public String getBookname(){
        return this.name;
    }

    public String getAuthorname(){
        return this.author;
    }

    public boolean isBorrowed(){
        return this.isBorrowed;
    }

    public void setBorrowedStatus(boolean flag){
        this.isBorrowed=flag;
    }
 }