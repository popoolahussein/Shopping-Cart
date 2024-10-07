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

export default QuantityControl;
