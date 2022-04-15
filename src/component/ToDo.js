import React, { Component } from 'react'

export default class ToDo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            isLoading: false,
            isError: false
        }
    }
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        if (response.ok) {
            const users = await response.json();
            console.log(users);
            this.setState({ users: users, isLoading: false })
        }
        else {
            this.setState({ isError: true, isLoading: false })
        }
    }
    handleClick = () => {
        console.log("clicked");
        return (
            <>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                ...
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    render() {
        const { users, isLoading, isError } = this.state;
        if (isLoading) {
            <div>Loading...</div>
        }
        if (isError) {
            <div>Error...</div>
        }
        return (
            <>
                <div className="container">
                    <h1 className="text-center mt-3">User Data</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ToDo ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.title}</td>
                                        <td>{user.completed.toString()}</td>
                                        <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={this.handleClick}>
                                            Launch demo modal
                                        </button></td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}