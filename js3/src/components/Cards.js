import React from 'react'
import { currencyFormatter } from '../utils';
import { Button, Card, ProgressBar, Stack } from 'react-bootstrap'
const Cards = ({ name, amount, max, gray }) => {
    const colors = []
    if (amount > max) {
        colors.push("bg-danger", "bg-opacity-10")
    } else if (gray) {
        colors.push("bg-light")
    }
    return (
        <Card className={colors.join(" ")}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <div className='me-2'>{name}</div>
                    <div className="d-flex align-items-baseline">{currencyFormatter.format(amount)} /<span className='text-muted fs-6 ms-2'>{currencyFormatter.format(max)}
                    </span>
                    </div>
                </Card.Title>
                <ProgressBar className='rounded-pill' variant={getProgressBar(amount, max)} min={0} max={max} now={amount} />
                <Stack direction="horizontal" gap="2" className="mt-4" >
                    <Button variant="outline-warning" className="ms-auto">Add Expense</Button>
                    <Button variant="outline-secondary">View  Expenses</Button>
                </Stack>
            </Card.Body>
        </Card >
    )
}
function getProgressBar(amount, max) {
    const getRatio = amount / max;
    if (getRatio < .5) return 'primary'
    if (getRatio < .75) return 'warning'
    return 'danger'
}
export default Cards
