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

    @GetMapping("/get/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        Book temp = bookService.getBookById(id);
        return ResponseEntity.ok(temp);
    }

    @PostMapping("/form")
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        Book bookTemp = bookService.addBook(book);
        return ResponseEntity.ok(bookTemp);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book book) {
        book.setId(id);
        Book bookTemp = bookService.updateBook(book);
        return ResponseEntity.ok(bookTemp);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable Long id) {
        Book bookTemp = bookService.deleteBook(id);
        return ResponseEntity.ok(bookTemp);
    }

}
