package com.example.back.controller;

import com.example.back.entity.Book;
import com.example.back.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/books")
public class BookController {
    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<Book>> getBooks() {
        List<Book> books = bookService.getBooks();
        if (books == null || books.isEmpty()) {
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.ok(books);
        }
    }

    @PostMapping("/form")
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        System.out.println("hiiiiii" + book.getDescription());
        Book bookTemp = bookService.addBook(book);
        return ResponseEntity.ok(bookTemp);
    }


}
