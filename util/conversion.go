package util

func BytesToGB(bytes int) float64 {
	gigabytes := float64(bytes) / (1e+9)
	return gigabytes
}