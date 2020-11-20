<>
        <div className="row">
          <form style={{width: '100%'}}>
              <div className="row mb-3 mt-3 imagem-inputs">
                  <div className="custom-control custom-switch alinha-fim">
                      <input type="checkbox" className="custom-control-input" id="preVenda" />
                      <label className="custom-control-label" for="preVenda">Pré Venda</label>
                  </div>
                    <div className="col-md-12">
                      <p>Imagens:</p>
                      <div id="imagensInseridas" className="d-flex">
                          {imagens.map((it, index) =>{
                            return (
                              <div className="div-miniImagem" key={index}>
                                <button type="button" className="excluir-imagem"
                                  onClick={()=>{removeImg(index)}}
                                >X</button>
                                <img src={it.small} alt={it.alt} className="miniImagem"/>
                              </div>
                            );
                          })}
                      </div>
                        <div className="form-group">
                          <div className="input-group">
                            <div className="custom-file">
                              <input type="file" className="custom-file-input" id="imagem" 
                                filename={selectedImg.name} 
                                onChange={(event) => {
                                  if(typeof event.target.files[0] !== "undefined"){
                                    setSelectedImg(event.target.files[0]);
                                  }else{
                                    setSelectedImg({});
                                  }
                                  }}/>
                              <label className="custom-file-label" for="imagem">{
                                (typeof selectedImg.name === "undefined") ? "Escolha uma Imagem..." : selectedImg.name
                              }</label>
                            </div>
                            <input type="text" className="input-control form-control" id="altImg" 
                              placeholder="Adicione uma descrição a imagem..."
                              value={altImg} 
                              onChange={(event) => {setAltImg(event.target.value)}}
                            />
                            <div className="input-group-append">
                              <button className="btn btn-outline-secondary" type="button" onClick={() => {addImage()}}>Enviar</button>
                            </div>
                          </div>
                      </div>
                    </div>
              
              </div>
              <div className="row pt-3">
                  <div className="form-group col-md-5">
                    <label for="nomeProduto">Nome do Produto</label>
                    <input type="text" className="input-control form-control" id="nomeProduto" 
                      value={nomeProduto} 
                      onChange={(event) => {setNomeProduto(event.target.value)}}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label for="precoProduto">Preço</label>
                    <input type="number" className="input-control form-control" id="precoProduto"  
                      value={precoProduto} 
                      onChange={(event) => {setPrecoProduto(event.target.value)}}
                      />
                  </div>
                  <div className="form-group col-md-3">
                    <label for="descontoProduto">Preço</label>
                    <input type="number" className="input-control form-control" id="descontoProduto"  
                      value={descontoProduto} 
                      onChange={(event) => {setDescontoProduto(event.target.value)}}
                      />
                  </div>
              </div>
              <div className="row">
                  <div className="form-group col-md-3">
                      <label for="categoria">Tipo</label>
                      <select className="custom-select" id="tipo"
                        value={tipo}
                        onChange={(event) => {setTipo(event.target.value)}}
                      >
                          <option value="novo">Novo</option>
                          <option value="PR">Produtos</option>
                          <option value="EV">Eventos</option>
                      </select>
                  </div>
                  <div className="form-group col-md-3">
                      <label for="categoria">Categoria</label>
                      <select className="custom-select" id="categoria"
                      value={categoria}
                      onChange={(event) => {setCategoria(event.target.value)}}
                    >
                        <option value="nova">Nova</option>
                        {arrayCategorias.map((cat, index)=>{
                          return(
                            <option value={cat} key={index}>{cat}</option>
                          );
                        })}
                      </select>
                  </div>
                  <div className="form-group col-md-5">
                      <label for="novaCategoria">Nome da Nova Categoria</label>
                      <input type="text" className="input-control form-control" id="novaCategoria" disabled="true"
                        value={novaCategoria}
                        onChange={(event) => {setNovaCategoria(event.target.value)}}
                      />
                  </div>
              </div>
              <div className="row" style={{width: '93%'}}>
                  <div className="form-group ml-3">
                      <label for="descricao">Descrição</label>
                      <textarea className="form-control" id="descricao" rows="5"
                        value={descricao}
                        onChange={(event) => {setDescricao(event.target.value)}}
                      ></textarea>
                  </div>
              </div>
              <div className="row pl-1">
                  <button type="button" className="btn btn-outline-secondary">Adicionar Campo de Opções</button>
              </div>
              <div className="row justify-content-end mb-2 pr-1">
                  <button type="button" className="btn btn-success">Cadastrar</button>
              </div>
          </form>
        </div>
      </>