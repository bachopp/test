package database

import (
	"bufio"
	"database/sql"
	"log"
	"os"

	_ "github.com/ziutek/mymysql/godrv" // driver mysql
)

// InitializeDb creates all neccesary tables for autograder
func InitializeDb() {
	db, err := sql.Open("mymysql",
		"agdatabase/autograder/autograder")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	f, err := os.Open("/var/www/autograder/database/database.sql")
	if err != nil {
		log.Fatal(err)
	}

	scanner := bufio.NewScanner(f)

	for scanner.Scan() {
		line := scanner.Text()
		_, err := db.Exec(line)
		if err != nil {
			log.Fatal(err)
		}
	}
}
