import React, { Component } from 'react';
// import Identicon from 'identicon.js';
const web3_utils = require('web3-utils');

class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
            <div className="content mr-auto ml-auto">

              <p>&nbsp;</p>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const content = this.contractContent.value
                  const value = this.contractValue.value
                  const next = this.contractNext.value
                  const end = this.contractEnd.value
                  this.props.createContract(content, value, next, end)
                }}>
                <div className="form-group mr-sm-2">
                  <input
                    id="contractContent"
                    type="text"
                    ref={(input) => { this.contractContent = input }}
                    className="form-control"
                    placeholder="Content of the contract?"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="contractValue"
                    type="text"
                    ref={(input) => { this.contractValue = input }}
                    className="form-control"
                    placeholder="Value of the Contract? (in ETH)"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="contractNext"
                    type="text"
                    ref={(input) => { this.contractNext = input }}
                    className="form-control"
                    placeholder="Enter key of first Chain partner"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="contractEnd"
                    type="text"
                    ref={(input) => { this.contractEnd = input }}
                    className="form-control"
                    placeholder="Enter key of the recipient"
                    required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Create Contract</button>
              </form>
              <p>&nbsp;</p>

              { this.props.contracts.map((contract, key) => {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <small className="text-muted">Contract ID: {contract.id.toString()}</small><p></p>
                      <small className="text-muted">Contract created by: {contract.author}</small><p></p>
                      <small className="text-muted">Current: {contract.current}</small><p></p>
                      <small className="text-muted">Recipient: {contract.recipient}</small><p></p>
                    </div>
                    <ul id="postList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p>{contract.content}</p>
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          VALUE: {web3_utils.fromWei(contract.linkedAmount.toString(), 'Ether')} ETH
                        </small><p>&nbsp;</p>

                        
                        <form name={contract.id} onSubmit={(event) => {
                            event.preventDefault()
                            const next = this.nextOwner.value
                            this.props.moveContract(event.target.name, next)
                          }}>
                          <div className="form-group mr-sm-2">
                            <input
                              id="nextOwner"
                              name={contract.id}
                              type="text"
                              ref={(input) => { this.nextOwner = input }}
                              className="form-control"
                              placeholder="Enter key of next partner"
                              required />
                          </div>
                          <button name={contract.id} type="submit" className="btn btn-primary btn-block">Mark as recieved, collect crypto and move to next partner</button>
                        </form>


                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;