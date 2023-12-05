package main

import (
	"context"
	"fmt"
	"os"
	"path/filepath"

	// "encoding/json"
	"strings"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
func (a *App) ProcessFile()(string) {
	return "greetings for wails"
}


func (a *App) openDirectory(path string) ([]string, error){
	var allFiles []string
	fmt.Printf("Processing directory: %s\n", path)

	// Perform operations on the current directory if needed

	// List all files and subdirectories in the current directory
	entries, err := os.ReadDir(path)
	if err != nil {
		return nil, err
	}
	// fmt.Println(reflect.TypeOf(entries))

	for _, entry := range entries {
		fullPath := filepath.Join(path, entry.Name())
		fullPath = strings.Replace(fullPath, "\\", "/", -1)
		allFiles = append(allFiles, fullPath)

	}
	// jsonData, err := json.Marshal(allFiles)
	if err != nil {
		fmt.Println("Error:", err)
		return nil, err
	}
	// fmt.Println(string(jsonData))
	return allFiles, nil
}
