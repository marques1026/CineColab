import React, { useState } from 'react';
import Button from '../button/Button';
import "./InputFiltro.css";

export default function FilterModal({ isOpen, onClose, onApplyFilter }) {
  const [filters, setFilters] = useState({
    year: '',
    director: '',
    genre: '',
    actor: ''
  });

  const handleInputChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyFilter = () => {
    onApplyFilter(filters);
    onClose();
  };

  const handleCancel = () => {
    setFilters({
      year: '',
      director: '',
      genre: '',
      actor: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">
          Filtrar <span className="highlight">Por</span>
        </h2>

        <div className="modal-form">
          {/* Ano de Lançamento */}
          <div className="form-group">
            <label className="form-label">Ano de Lançamento:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: 2013"
              value={filters.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
            />
          </div>

          {/* Diretor(a) */}
          <div className="form-group">
            <label className="form-label">Diretor(a):</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Chris Renaud"
              value={filters.director}
              onChange={(e) => handleInputChange('director', e.target.value)}
            />
          </div>

          {/* Gênero */}
          <div className="form-group">
            <label className="form-label">Gênero:</label>
            <input
              type="text"
              className="form-input active"
              placeholder="Ex: Ação, Aventura, Infantil"
              value={filters.genre}
              onChange={(e) => handleInputChange('genre', e.target.value)}
            />
          </div>

          {/* Ator */}
          <div className="form-group">
            <label className="form-label">Ator:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Pierre Coffin"
              value={filters.actor}
              onChange={(e) => handleInputChange('actor', e.target.value)}
            />
          </div>
        </div>

        {/* Botões de ação */}
        <div className="modal-actions">
          <Button variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleApplyFilter}>
            Filtrar
          </Button>
        </div>
      </div>
    </div>
  );
}