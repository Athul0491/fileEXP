package main

import (
	"context"
	"exPL/util"
	"fmt"
	"io/fs"
	"os"
	"os/exec"
	"path/filepath"
	"sort"
	"strconv"
	"strings"

	"github.com/sahilm/fuzzy"
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


func (a *App) OpenDirectory(path string) ([]map[string]string, error){
	var allFiles []map[string]string
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
		temp := make(map[string]string)
		if entry.IsDir() {
			temp["Directory"] = fullPath
		}else {
			temp["File"] = fullPath
		}
		allFiles = append(allFiles, temp)

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
type DirectoryChild struct {
	Name string
}
func (a *App) Search_Directory(query string, searchDirectory string, extension string, acceptFiles bool, acceptDirectories bool) []DirectoryChild {
	var results []DirectoryChild
	var fuzzyScores []fuzzy.Match

	err := filepath.WalkDir(searchDirectory, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		fileName := d.Name()

		if d.IsDir() {
			if !acceptDirectories {
				return nil
			}

			matches := fuzzy.Find(query, []string{fileName})
			fmt.Printf("Dir: %s, Query: %s, Matches: %v\n", fileName, query, matches)

			if len(matches) == 0 || matches[0].Score < 40 {
				return nil
			}

			results = append(results, DirectoryChild{Name: fileName})
			fuzzyScores = append(fuzzyScores, matches[0])
		} else if acceptFiles {
			if len(extension) > 0 && !strings.HasSuffix(fileName, extension) {
				return nil
			}

			// Remove extension from file name.
			cleanedFilename := strings.TrimSuffix(fileName, filepath.Ext(fileName))
			matches := fuzzy.Find(query, []string{cleanedFilename})
			fmt.Printf("File: %s, Query: %s, Matches: %v\n", fileName, query, matches)

			if len(matches) == 0 || matches[0].Score < 20 {
				return nil
			}

			results = append(results, DirectoryChild{Name: fileName})
			fuzzyScores = append(fuzzyScores, matches[0])
		}

		return nil
	})

	if err != nil {
		fmt.Println("Error:", err)
	}

	// Sort by fuzzy score
	sort.Slice(fuzzyScores, func(i, j int) bool {
		return fuzzyScores[i].Score > fuzzyScores[j].Score
	})

	// Reorder results based on sorted scores
	for _, match := range fuzzyScores {
		for i, result := range results {
			if result.Name == match.Str {
				results[i] = results[len(results)-1]
				results = results[:len(results)-1]
				break
			}
		}
	}

	return results
}