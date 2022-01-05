import CoverageLimits from './CoverageLimits';
import CoverageOptions from './CoverageOptions';
import Deductibles from './Deductables';
import UnderwritingAnswers from './UnderwritingAnswers';

const QuoteSection = ({quote, formValues}) => {
    const {
        additionalInterests,
        coverageLimits,
        coverageOptions,
        deductibles,
        policyHolderMailingAddress,
        policyHolders,
        underwritingAnswers
    } = quote.properties

    console.log('quote', quote);
    console.log('formValues', formValues);

    return (
        <div>
            <div>Coverage Limits</div>
            <CoverageLimits coverageData={coverageLimits} />
            <div>Coverage Options</div>
            <CoverageOptions coverageOptions={coverageOptions} />
            <Deductibles deductiblesData={deductibles}/>
            <UnderwritingAnswers underwritingData={underwritingAnswers} />
        </div>
    )
}

export default QuoteSection;
