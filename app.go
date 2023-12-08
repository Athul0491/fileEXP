package main

import (
	"context"
	"exPL/util"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"

	// "encoding/json"
	"strings"
)

// type Drive struct{
// 	name string
// 	used_gb int
// 	total_gb int
// 	letter string
// }
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


func (a *App) OpenDirectory(path string) ([]string, error){
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

func (a *App) GetDisks() ([]map[string]interface{}, error) {
	cmd := exec.Command("wmic", "logicaldisk", "get", "deviceid,freespace,size")
	output, err := cmd.Output()
	if err != nil {
		return nil, err
	}

	lines := strings.Split(string(output), "\n")
	diskSpaces  := []map[string]interface{}{}

	for _, line := range lines[1:] {
		fields := strings.Fields(line)
		if len(fields) == 3 {
			used_gb, _ := strconv.ParseFloat(fields[1],64)
			total_gb, _:= strconv.ParseFloat(fields[2],64)
			diskSpace := map[string]interface{}{
				"name": fields[0], 
				"used_gb": util.BytesToGB(used_gb),
				"total_gb":util.BytesToGB(total_gb),
				"letter":fields[0][0:1],
			}
			diskSpaces = append(diskSpaces, diskSpace)
			
		}
	}
	return diskSpaces, nil
}