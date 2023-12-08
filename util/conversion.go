package util

func BytesToGB(bytes float64) float64 {
	gigabytes := float64(bytes) / (1e+9)
	return gigabytes
}