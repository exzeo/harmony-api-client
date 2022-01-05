import Radio from './Radio';

const UnderwritingAnswers = ({underwritingData}) => {
    const {
        business,
        fourPointUpdates,
        monthsOccupied,
        noPriorInsuranceSurcharge,
        previousClaims,
        rented
    } = underwritingData;

    return (
        <div>
            <div>UnderWritingAnswers</div>
            <Radio label={business.question} name='underwritingAnswers.business.value' radioList={business.schema.enum} />
            <Radio label={fourPointUpdates.question} name='underwritingAnswers.fourPointUpdates.value' radioList={fourPointUpdates.schema.enum} />
            <Radio label={monthsOccupied.question} name='underwritingAnswers.monthsOccupied.value' radioList={monthsOccupied.schema.enum} />
            <Radio label={noPriorInsuranceSurcharge.question} name='underwritingAnswers.noPriorInsuranceSurcharge.value' radioList={noPriorInsuranceSurcharge.schema.enum} />
            <Radio label={previousClaims.question} name='underwritingAnswers.previousClaims.value' radioList={previousClaims.schema.enum} />
            <Radio label={rented.question} name='underwritingAnswers.rented.value' radioList={rented.schema.enum} />
        </div>
    );
}

export default UnderwritingAnswers;
