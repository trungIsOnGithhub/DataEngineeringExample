const userData = {};

// const roles = ["student", "officer"];

const rolesMap = {};

function getRoleByUsername(username) {
    const adminusernames = ["admin"];

    if (adminusernames.includes(username)) {
        return "officer";
    }

    return "student";
}

module.exports = {
    userData,
    rolesMap,
    getRoleByUsername
}