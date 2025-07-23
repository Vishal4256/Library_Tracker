import java.util.Scanner;

public class Executor {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Library lib = new Library();

        while (true) {
            System.out.println("\n*** Library Menu ***");
            System.out.println("1. Show books");
            System.out.println("2. Return book");
            System.out.println("3. Borrow book");
            System.out.println("4. Add book");
            System.out.print("Enter your choice: ");
            int ch = sc.nextInt();
            sc.nextLine(); // consume newline

            switch (ch) {
                case 1:
                    lib.displayBooks();
                    break;

                case 2:
                    lib.displayBooks(); // show all books so index matches
                    System.out.print("Enter the index of the book to return: ");
                    int ind = sc.nextInt();
                    lib.returnBook(ind - 1); // 1-based to 0-based
                    break;

                case 3:
                    lib.displayBooks();
                    System.out.print("Enter the index of the book to borrow: ");
                    int ind2 = sc.nextInt();
                    if (lib.borrowBook(ind2 - 1)) {
                        System.out.println("Book has been issued.");
                    } else {
                        System.out.println("Book can't be issued.");
                    }
                    break;

                case 4:
                    System.out.print("Enter book name: ");
                    String name = sc.nextLine();
                    System.out.print("Enter author name: ");
                    String author = sc.nextLine();
                    if (lib.addBook(name.trim(), author.trim())) {
                        System.out.println("Book added successfully.");
                    } else {
                        System.out.println("Failed to add book.");
                    }
                    break;

                default:
                    System.out.println("Invalid choice.");
            }

            System.out.print("Do you want to continue? (y/n): ");
            char cont = sc.next().charAt(0);
            if (cont != 'y' && cont != 'Y') break;
        }

        sc.close();
    }
}