

const listOfUser = async () => {
    const token = localStorage.getItem("token")

    if(!token) return

    const response = await fetch("/api/user/list", {
        method: "GET",
        headers: {
            "authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        document.getElementById("error").textContent = "Error while fetching users."
    } else {
        const data = await response.json()
        let users = ''
        data.map(user => {
            users += `<li>email: ${user.email}</li> <li>password: ${user.password}</li>`
        })
        document.getElementById("user-list").innerHTML = users


    }

}


listOfUser()

const logout = () => {
    localStorage.removeItem("token")
    window.location.href="../login.html";
}
document.getElementById("logout").addEventListener("click", logout)