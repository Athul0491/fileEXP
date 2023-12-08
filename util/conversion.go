package util

func BytesToGB(bytes int) float64 {
	gigabytes := int(bytes) / (1e+9)
	return gigabytes
}