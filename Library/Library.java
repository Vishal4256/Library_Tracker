import java.util.ArrayList;

public class Library {
    private ArrayList<Book> arr;

    public Library() {
        arr = new ArrayList<>();
    }

    public ArrayList<Book> getBooks() {
        return arr;
    }

    public boolean addBook(String name, String author) {
        try {
            arr.add(new Book(name, author));
        } catch (Exception ex) {
            System.out.println("Exception happened at the time of adding the book");
            return false;
        }
        return true;
    }

    public void displayBooks() {
        if (arr.isEmpty()) return;
        for (int i = 0; i < arr.size(); i++) {
            System.out.println((i + 1) + ". " + arr.get(i).getBookname());
        }
    }

    public void showBorrowBook() {
        if (arr.isEmpty()) {
            System.out.println("No books in the Library");
            return;
        }
        for (int i = 0; i < arr.size(); i++) {
            if (arr.get(i).isBorrowed()) {
                System.out.println((i + 1) + ". " + arr.get(i).getBookname());
            }
        }
    }

    public void returnBook(int indexOfBook) {
        if (indexOfBook < 0 || indexOfBook >= arr.size()) {
            System.out.println("Invalid book index.");
            return;
        }

        Book book = arr.get(indexOfBook);
        if (!book.isBorrowed()) {
            System.out.println("This book wasn't borrowed.");
            return;
        }

        book.setBorrowedStatus(false);
        System.out.println("Book returned successfully.");
    }

    public boolean borrowBook(int indexOfBook) {
        if (!(indexOfBook >= 0 && indexOfBook < arr.size())) return false;
        if (arr.get(indexOfBook).isBorrowed()) return false;
        arr.get(indexOfBook).setBorrowedStatus(true);
        return true;
    }
}