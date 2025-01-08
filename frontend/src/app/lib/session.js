export async function setErrorMessage(message) {
    sessionStorage.setItem('error', message)
}

export async function clearSession() {
    sessionStorage.clear()
}