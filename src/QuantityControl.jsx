import PropTypes from 'prop-types';

const QuantityControl = ({ quantity, onIncrement, onDecrement }) => {
  return (
    <div className="quantity-control">
      <button className="decrement-button" onClick={onDecrement}>
        -
      </button>
      <span>{quantity}</span>
      <button className="increment-button" onClick={onIncrement}>
        +
      </button>
    </div>
  );
};

QuantityControl.propTypes = {
  quantity: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

export default QuantityControl;
