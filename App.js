import React, { Component } from 'react';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			title:"TODO APP",
			act:0,
			index:'',
			datas:[]
		};
	}

	componentDidMount() {
		this.refs.name.focus();
	}

	fSubmit = (e) => {
		e.preventDefault();

		let datas = this.state.datas;
		let name = this.refs.name.value;
		let address = this.refs.address.value;

		if(this.state.act === 0) {    //act === 0 new data arrived add
			let data = { name, address }
			datas.push(data);
		}
		else {												// act === 1 update data 
			let index = this.state.index;
			datas[index].name = name;
			datas[index].address = address;
		}


		this.setState({
			datas:datas,
			act:0
		});

		this.refs.myForm.reset();
		this.refs.name.focus();
	}

	fRemove = (i) => {
		let datas = this.state.datas;
		datas.splice(i,1);
		this.setState({
			datas:datas
		});

		this.refs.myForm.reset();
		this.refs.name.focus();
	}

	fEdit = (i) => {
		let data = this.state.datas[i];
		this.refs.name.value = data.name;
		this.refs.address.value = data.address;

		this.setState({
			act:1,
			index:i
		});
	}

	render() {
		let datas = this.state.datas;
		return (
		<div className="App">
			<h1>{this.state.title}</h1>
			<form ref="myForm">	
				<input placeholder = "Name" ref="name" />&nbsp;&nbsp;
				<input placeholder = "Address" ref="address" />&nbsp;&nbsp;
				{/* <button onClick={this.fSubmit}>Submit</button> */}
				<button onClick={(e) => this.fSubmit(e)}>Submit</button>
			</form>
			<pre>
				{
					datas.map((data,i) => 
						<li key={i}>
							{i+1}.{data.name},{data.address}
							{/* <button onClick={this.fSubmit}>Submit</button> */}
							<button onClick={() => this.fRemove(i)}>Remove</button>
							<button onClick={() => this.fEdit(i)}>Edit</button>
						</li>
					)
				}
			</pre>
		</div>
		);
	}
}

export default App;
